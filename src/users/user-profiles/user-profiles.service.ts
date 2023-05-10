import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfiles } from 'output/entities/UserProfiles';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfiles)
    private serviceRepo: Repository<UserProfiles>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      relations: {
        usproAddr: true,
        usproUser: true,
      },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { usproId: id },
      relations: {
        usproAddr: true,
        usproUser: true,
      },
    });
  }

  public async Create(
    usproId,
    usproNationalId: string,
    usproBirtDate: string,
    usproJobTitle: string,
    usproMartialStatus: string,
    usproGender: string,
    usproUser,
  ) {
    try {
      const userProfiles = await this.serviceRepo.save({
        usproId: usproId,
        usproNationalId: usproNationalId,
        usproBirtDate: usproBirtDate,
        usproJobTitle: usproJobTitle,
        usproMartialStatus: usproMartialStatus,
        usproGender: usproGender,
        usproUser: usproUser,
      });
      return userProfiles;
    } catch (error) {
      return error.mesagge;
    }
  }

  public async Update(
    id: number,
    usproNationalId: string,
    usproBirtDate: string,
    usproJobTitle: string,
    usproMartialStatus: string,
    usproGender: string,
    usproUser,
  ) {
    try {
      const userProfiles = await this.serviceRepo.update(id, {
        usproNationalId: usproNationalId,
        usproBirtDate: usproBirtDate,
        usproJobTitle: usproJobTitle,
        usproMartialStatus: usproMartialStatus,
        usproGender: usproGender,
        usproUser: usproUser,
      });
      return userProfiles;
    } catch (error) {
      return error.mesagge;
    }
  }

  public async Delete(id: number) {
    try {
      const userProfiles = await this.serviceRepo.delete(id);
      return userProfiles;
    } catch (error) {
      return error.mesagge;
    }
  }
}
