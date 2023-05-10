import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBonusPoints } from 'output/entities/UserBonusPoints';
import { Repository } from 'typeorm';

@Injectable()
export class UserBonusPointsService {
  constructor(
    @InjectRepository(UserBonusPoints)
    private serviceRepo: Repository<UserBonusPoints>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      relations: {
        ubpoUser: true,
      },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { ubpoId: id },
      relations: {
        ubpoUser: true,
      },
    });
  }

  public async Create(
    ubpoId,
    ubpoTotalPoints: number,
    ubpoBonusType: string,
    ubpoCreatedOn: Date = new Date(),
    ubpoUser,
  ) {
    try {
      const userbonuspoints = await this.serviceRepo.save({
        ubpoId: ubpoId,
        ubpoTotalPoints: ubpoTotalPoints,
        ubpoBonusType: ubpoBonusType,
        ubpoCreatedOn: ubpoCreatedOn,
        ubpoUser: ubpoUser,
      });
      return userbonuspoints;
    } catch (error) {
      return error.mesagge;
    }
  }

  public async Update(
    id: number,
    ubpoTotalPoints: number,
    ubpoBonusType: string,
    ubpoCreatedOn: Date = new Date(),
    ubpoUser,
  ) {
    try {
      const userbonuspoints = await this.serviceRepo.update(id, {
        ubpoTotalPoints: ubpoTotalPoints,
        ubpoBonusType: ubpoBonusType,
        ubpoCreatedOn: ubpoCreatedOn,
        ubpoUser: ubpoUser,
      });
      return userbonuspoints;
    } catch (error) {
      return error.mesagge;
    }
  }

  public async Delete(id: number) {
    try {
      const userbonuspoints = await this.serviceRepo.delete(id);
      return userbonuspoints;
    } catch (error) {
      return error.mesagge;
    }
  }
}
