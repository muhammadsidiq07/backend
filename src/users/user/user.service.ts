import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { UserRoles } from 'output/entities/UserRoles';
import { UserMembers } from 'output/entities/UserMembers';
import { Users } from 'output/entities/Users';
import { UserPassword } from 'output/entities/UserPassword';
import { UserBonusPoints } from 'output/entities/UserBonusPoints';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(UserPassword)
    private userPassword: Repository<UserPassword>,
    @InjectRepository(UserRoles) private userRoles: Repository<UserRoles>,
    @InjectRepository(UserMembers) private userMembers: Repository<UserMembers>,
    @InjectRepository(UserBonusPoints)
    private userBonusPoints: Repository<UserBonusPoints>,
    private jwtService: JwtService,
  ) {}

  public async validateUser(userFullName: string, password: string) {
    const user = await this.usersRepo.findOne({
      relations: {
        userRoles: true,
        userPassword: true,
        userMembers: true,
      },
      where: [{ userFullName: userFullName }],
    });

    const compare = await Bcrypt.compare(password, password);
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
      await this.userBonusPoints.save({
        ubpoId: user.userId,
        ubpoTotalPoints: 0,
        ubpoBonusType: 'R',
        ubpoCreatedOn: new Date(),
      });
      return profile;
    } catch (error) {
      return error.message;
    }
  }

  public async login(user: any) {
    const payload = {
      username: user.userFullName,
      password: user.uspaPasswordhash,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
