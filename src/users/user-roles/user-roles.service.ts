import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRoles } from 'output/entities/UserRoles';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRoles)
    private serviceRepo: Repository<UserRoles>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      relations: {
        usroRole: true,
        usroUser: true,
      },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { usroUserId: id },
      relations: {
        usroRole: true,
        usroUser: true,
      },
    });
  }

  public async Create(usroUserId, usroRole, usroUser) {
    try {
      const userRoles = await this.serviceRepo.save({
        usroUserId: usroUserId,
        usroRole: usroRole,
        usroUser: usroUser,
      });
      return userRoles;
    } catch (error) {
      return error.mesagge;
    }
  }

  public async Update(id: number, usroRole, usroUser) {
    try {
      const userRoles = await this.serviceRepo.update(id, {
        usroRole: usroRole,
        usroUser: usroUser,
      });
      return userRoles;
    } catch (error) {
      return error.mesagge;
    }
  }

  public async Delete(id: number) {
    try {
      const userRoles = await this.serviceRepo.delete(id);
      return userRoles;
    } catch (error) {
      return error.mesagge;
    }
  }
}
