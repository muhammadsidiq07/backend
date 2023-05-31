import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPassword } from 'output/entities/UserPassword';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export default class UserPasswordService {
  constructor(
    @InjectRepository(UserPassword)
    private serviceRepo: Repository<UserPassword>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      relations: {
        uspaUser: true,
      },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { uspaUserId: id },
      relations: {
        uspaUser: true,
      },
    });
  }

  public async Create(
    uspaUserId,
    uspaPasswordhash: string,
    uspaPasswordsalt: string,
    uspaUser,
  ) {
    try {
      const userPassword = await this.serviceRepo.save({
        uspaUserId: uspaUserId,
        uspaPasswordhash: uspaPasswordhash,
        uspaPasswordsalt: uspaPasswordsalt,
        uspaUser: uspaUser,
      });
      return userPassword;
    } catch (error) {
      return error.mesagge;
    }
  }

  public async Update(
    id: number,
    uspaPasswordhash: string,
    uspaPasswordsalt: string,
    uspaUser,
  ) {
    try {
      const hashpassword = await Bcrypt.hash(uspaPasswordhash, saltOrRounds);
      const userPassword = await this.serviceRepo.update(id, {
        uspaPasswordhash: hashpassword,
        uspaPasswordsalt: uspaPasswordsalt,
        uspaUser: uspaUser,
      });
      return userPassword;
    } catch (error) {
      return error.mesagge;
    }
  }

  public async Delete(id: number) {
    try {
      const userPassword = await this.serviceRepo.delete(id);
      return userPassword;
    } catch (error) {
      return error.mesagge;
    }
  }
}
