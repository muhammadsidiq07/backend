import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserBonusPointsService } from './user-bonus-points.service';

@Controller('user-bonus-points')
export class UserBonusPointsController {
  constructor(private Service: UserBonusPointsService) {}

  @Get()
  public async getAll() {
    return await this.Service.findAll();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Service.findOne(id);
  }
  @Post()
  public async Create(
    @Body('ubpoId') ubpoId,
    @Body('ubpoTotalPoints') ubpoTotalPoints: number,
    @Body('ubpoBonusType') ubpoBonusType: string,
    @Body('ubpoCreatedOn') ubpoCreatedOn: Date,
    @Body('userId') ubpoUser,
  ) {
    return await this.Service.Create(
      ubpoId,
      ubpoTotalPoints,
      ubpoBonusType,
      ubpoCreatedOn,
      ubpoUser,
    );
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('ubpoTotalPoints') ubpoTotalPoints: number,
    @Body('ubpoBonusType') ubpoBonusType: string,
    @Body('ubpoCreatedOn') ubpoCreatedOn: Date,
    @Body('userId') ubpoUser,
  ) {
    return await this.Service.Update(
      id,
      ubpoTotalPoints,
      ubpoBonusType,
      ubpoCreatedOn,
      ubpoUser,
    );
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Service.Delete(id);
  }
}
