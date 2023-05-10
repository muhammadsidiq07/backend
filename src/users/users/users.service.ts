import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private serviceRepo: Repository<Users>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      relations: {
        userBonusPoints: true,
        userMembers: true,
        userPassword: true,
        userProfiles: true,
        userRoles: true,
      },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { userId: id },
    });
  }

  public async Create(
    userId,
    userFullName: string,
    userType: string,
    userCompanyName: string,
    userEmail: string,
    userPhoneNumber: string,
    userModifiedDate: Date = new Date(),
    userBonusPoints,
    userMembers,
    userPassword,
    userProfiles,
    userRoles,
  ) {
    try {
      const users = await this.serviceRepo.save({
        userId: userId,
        userFullName: userFullName,
        userType: userType,
        userCompanyName: userCompanyName,
        userEmail: userEmail,
        userPhoneNumber: userPhoneNumber,
        userModifiedDate: userModifiedDate,
        userBonusPoints: userBonusPoints,
        userMembers: userMembers,
        userPassword: userPassword,
        userProfiles: userProfiles,
        userRoles: userRoles,
      });
      return users;
    } catch (error) {
      return error.message;
    }
  }

  public async Update(
    id: number,
    userFullName: string,
    userType: string,
    userCompanyName: string,
    userEmail: string,
    userPhoneNumber: string,
    userModifiedDate: Date = new Date(),
    userBonusPoints,
    userMembers,
    userPassword,
    userProfiles,
    userRoles,
  ) {
    try {
      const users = await this.serviceRepo.update(id, {
        userFullName: userFullName,
        userType: userType,
        userCompanyName: userCompanyName,
        userEmail: userEmail,
        userPhoneNumber: userPhoneNumber,
        userModifiedDate: userModifiedDate,
        userBonusPoints: userBonusPoints,
        userMembers: userMembers,
        userPassword: userPassword,
        userProfiles: userProfiles,
        userRoles: userRoles,
      });
      return users;
    } catch (error) {
      return error.message;
    }
  }

  public async Delete(id: number) {
    try {
      const users = await this.serviceRepo.delete(id);
      return users;
    } catch (error) {
      return error.message;
    }
  }
}
