import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserMembersService } from './user-members.service';

@Controller('user-members')
export class UserMembersController {
  constructor(private Service: UserMembersService) {}

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
    @Body('usmeUserId') usmeUserId,
    @Body('usmePromoteDate') usmePromoteDate: Date,
    @Body('usmePoints') usmePoints: number,
    @Body('ubpoBonusType') usmeType: string,
    @Body('usmeMembName') usmeMembName: string,
    @Body('userId') usmeUser,
  ) {
    return await this.Service.Create(
      usmeUserId,
      usmePromoteDate,
      usmePoints,
      usmeType,
      usmeMembName,
      usmeUser,
    );
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('usmePromoteDate') usmePromoteDate: Date,
    @Body('usmePoints') usmePoints: number,
    @Body('ubpoBonusType') usmeType: string,
    @Body('usmeMembName') usmeMembName: string,
    @Body('userId') usmeUser,
  ) {
    return await this.Service.Update(
      id,
      usmePromoteDate,
      usmePoints,
      usmeType,
      usmeMembName,
      usmeUser,
    );
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Service.Delete(id);
  }
}
