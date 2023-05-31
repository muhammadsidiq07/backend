import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { UserRoles } from 'output/entities/UserRoles';
import { Roles } from 'output/entities/Roles';
import { UserMembers } from 'output/entities/UserMembers';
import { Users } from 'output/entities/Users';
import { UserPassword } from 'output/entities/UserPassword';
import { UserBonusPoints } from 'output/entities/UserBonusPoints';
import { UserProfiles } from 'output/entities/UserProfiles';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(UserPassword)
    private userPassword: Repository<UserPassword>,
    @InjectRepository(UserRoles) private userRoles: Repository<UserRoles>,
    @InjectRepository(Roles) private Roles: Repository<Roles>,
    @InjectRepository(UserMembers) private userMembers: Repository<UserMembers>,
    @InjectRepository(UserBonusPoints)
    private userBonusPoints: Repository<UserBonusPoints>,
    @InjectRepository(UserProfiles)
    private userProfiles: Repository<UserProfiles>,
    private jwtService: JwtService,
  ) {}

  public async validateUser(userFullName: string, password: string) {
    const user = await this.usersRepo.findOne({
      relations: {
        userPassword: true,
        userMembers: true,
        userBonusPoints: true,
        userProfiles: true,
        userRoles: {
          usroRole: true,
        },
      },
      where: [{ userFullName: userFullName }],
    });
    const userPass = await this.userPassword.findOne({
      where: [{ uspaUserId: user.userId }],
    });
    const password_new = userPass.uspaPasswordhash;
    const compare = await Bcrypt.compare(password, password_new);
    if (compare) {
      const { userPassword, ...result } = user;
      return result;
    }
  }

  public async signup(fields: any) {
    try {
      const user = await this.usersRepo.save({
        userFullName: fields.userFullName,
        userEmail: fields.userEmail,
        userType: '',
        userCompanyName: '',
        userPhoneNumber: fields.userPhoneNumber,
        userModifiedDate: new Date(),
      });
      let hashpassword = fields.uspaPasswordhash;
      hashpassword = await Bcrypt.hash(hashpassword, saltOrRounds);
      const profile = await this.userPassword.save({
        uspaUserId: user.userId,
        uspaPasswordhash: hashpassword,
        uspaPasswordsalt: fields.uspaPasswordhash,
      });
      await this.userMembers.save({
        usmeUserId: user.userId,
        usmePromoteDate: new Date(),
        usmePoints: 0,
        usmeType: 'default',
      });
      await this.userRoles.save({
        usroUserId: user.userId,
        usroRole: fields.usroRole,
      });
      await this.Roles.save({
        roleId: user.userId,
        roleName: fields.roleName,
      });
      await this.userBonusPoints.save({
        ubpoUser: { userId: user.userId },
        ubpoTotalPoints: 0,
        ubpoBonusType: 'R',
        ubpoCreatedOn: new Date(),
      });
      await this.userProfiles.save({
        usproId: user.userId,
        usproNationalId: 'IDN',
        usproBirtDate: fields.usproBirtDate,
        usproJobTitle: fields.usproJobTitle,
        usproMartialStatus: fields.usproMartialStatus,
        usproGender: fields.usproGender,
      });
      return profile;
    } catch (error) {
      return error.message;
    }
  }

  public async login(user: any) {
    const payload = {
      username: user.userFullName,
      email: user.userEmail,
      type: user.userType,
      company: user.userCompanyName,
      phone: user.userPhoneNumber,
      member: user.userMembers,
      roles: user.userRoles,
      role: user.Roles,
      points: user.userBonusPoints,
      profile: user.userProfiles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
