import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';

@Controller('user-profiles')
export class UserProfilesController {
  constructor(private Service: UserProfilesService) {}

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
    @Body('usproId') usproId,
    @Body('usproNationalId') usproNationalId: string,
    @Body('usproBirtDate') usproBirtDate: string,
    @Body('usproJobTitle') usproJobTitle: string,
    @Body('usproMartialStatus') usproMartialStatus: string,
    @Body('usproGender') usproGender: string,
    @Body('userId') usproUser,
  ) {
    return await this.Service.Create(
      usproId,
      usproNationalId,
      usproBirtDate,
      usproJobTitle,
      usproMartialStatus,
      usproGender,
      usproUser,
    );
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('usproNationalId') usproNationalId: string,
    @Body('usproBirtDate') usproBirtDate: string,
    @Body('usproJobTitle') usproJobTitle: string,
    @Body('usproMartialStatus') usproMartialStatus: string,
    @Body('usproGender') usproGender: string,
    @Body('userId') usproUser,
  ) {
    return await this.Service.Update(
      id,
      usproNationalId,
      usproBirtDate,
      usproJobTitle,
      usproMartialStatus,
      usproGender,
      usproUser,
    );
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Service.Delete(id);
  }
}
