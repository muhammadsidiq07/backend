import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private Service: UsersService) {}

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
    @Body('userId') userId,
    @Body('userFullName') userFullName: string,
    @Body('userType') userType: string,
    @Body('userCompanyName') userCompanyName: string,
    @Body('userEmail') userEmail: string,
    @Body('userPhoneNumber') userPhoneNumber: string,
    @Body('userModifiedDate') userModifiedDate: Date,
    @Body('userBonusPoints') userBonusPoints,
    @Body('usmeUserId') userMembers,
    @Body('uspaUserId') userPassword,
    @Body('usproId') userProfiles,
    @Body('usroUserId') userRoles,
  ) {
    return await this.Service.Create(
      userId,
      userFullName,
      userType,
      userCompanyName,
      userEmail,
      userPhoneNumber,
      userModifiedDate,
      userBonusPoints,
      userMembers,
      userPassword,
      userProfiles,
      userRoles,
    );
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('userFullName') userFullName: string,
    @Body('userType') userType: string,
    @Body('userCompanyName') userCompanyName: string,
    @Body('userEmail') userEmail: string,
    @Body('userPhoneNumber') userPhoneNumber: string,
    @Body('userModifiedDate') userModifiedDate: Date,
    @Body('userBonusPoints') userBonusPoints,
    @Body('usmeUserId') userMembers,
    @Body('uspaUserId') userPassword,
    @Body('usproId') userProfiles,
    @Body('usroUserId') userRoles,
  ) {
    return await this.Service.Update(
      id,
      userFullName,
      userType,
      userCompanyName,
      userEmail,
      userPhoneNumber,
      userModifiedDate,
      userBonusPoints,
      userMembers,
      userPassword,
      userProfiles,
      userRoles,
    );
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Service.Delete(id);
  }
}
