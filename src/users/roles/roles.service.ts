import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'output/entities/Roles';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private serviceRepo: Repository<Roles>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      relations: {
        userRoles: true,
      },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { roleId: id },
      relations: {
        userRoles: true,
      },
    });
  }

  public async Create(roleId, roleName: string) {
    try {
      const roles = await this.serviceRepo.save({
        roleId: roleId,
        roleName: roleName,
      });
      return roles;
    } catch (error) {
      return error.message;
    }
  }

  public async Update(id: number, roleName: string) {
    try {
      const roles = await this.serviceRepo.update(id, {
        roleName: roleName,
      });
      return roles;
    } catch (error) {
      return error.message;
    }
  }

  public async Delete(id: number) {
    try {
      const roles = await this.serviceRepo.delete(id);
      return roles;
    } catch (error) {
      return error.message;
    }
  }
}
