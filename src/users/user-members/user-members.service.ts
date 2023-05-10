import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMembers } from 'output/entities/UserMembers';
import { Repository } from 'typeorm';

@Injectable()
export class UserMembersService {
  constructor(
    @InjectRepository(UserMembers)
    private serviceRepo: Repository<UserMembers>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      relations: {
        usmeMembName: true,
        usmeUser: true,
      },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { usmeUserId: id },
      relations: {
        usmeMembName: true,
        usmeUser: true,
      },
    });
  }

  public async Create(
    usmeUserId,
    usmePromoteDate: Date = new Date(),
    usmePoints: number,
    usmeType: string,
    usmeMembName,
    usmeUser,
  ) {
    try {
      const usermembers = await this.serviceRepo.save({
        usmeUserId: usmeUserId,
        usmePromoteDate: usmePromoteDate,
        usmePoints: usmePoints,
        usmeType: usmeType,
        usmeMembName: usmeMembName,
        usmeUser: usmeUser,
      });
      return usermembers;
    } catch (error) {
      return error.mesagge;
    }
  }

  public async Update(
    id: number,
    usmePromoteDate: Date = new Date(),
    usmePoints: number,
    usmeType: string,
    usmeMembName,
    usmeUser,
  ) {
    try {
      const usermembers = await this.serviceRepo.update(id, {
        usmePromoteDate: usmePromoteDate,
        usmePoints: usmePoints,
        usmeType: usmeType,
        usmeMembName: usmeMembName,
        usmeUser: usmeUser,
      });
      return usermembers;
    } catch (error) {
      return error.mesagge;
    }
  }

  public async Delete(id: number) {
    try {
      const usermambers = await this.serviceRepo.delete(id);
      return usermambers;
    } catch (error) {
      return error.mesagge;
    }
  }
}
