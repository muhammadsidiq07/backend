import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import UserPasswordService from './user-password.service';

@Controller('user-password')
export class UserPasswordController {
  constructor(private Service: UserPasswordService) {}

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
    @Body('uspaUserId') uspaUserId,
    @Body('uspaPasswordhash') uspaPasswordhash: string,
    @Body('uspaPasswordsalt') uspaPasswordsalt: string,
    @Body('userId') uspaUser,
  ) {
    return await this.Service.Create(
      uspaUserId,
      uspaPasswordhash,
      uspaPasswordsalt,
      uspaUser,
    );
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('uspaPasswordhash') uspaPasswordhash: string,
    @Body('uspaPasswordsalt') uspaPasswordsalt: string,
    @Body('userId') uspaUser,
  ) {
    return await this.Service.Update(
      id,
      uspaPasswordhash,
      uspaPasswordsalt,
      uspaUser,
    );
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Service.Delete(id);
  }
}
