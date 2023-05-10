import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';

@Controller('user-roles')
export class UserRolesController {
  constructor(private Service: UserRolesService) {}

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
    @Body('usroUserId') usroUserId,
    @Body('usroRole') usroRole,
    @Body('usroUser') usroUser,
  ) {
    return await this.Service.Create(usroUserId, usroRole, usroUser);
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('usroRole') usroRole,
    @Body('usroUser') usroUser,
  ) {
    return await this.Service.Update(id, usroRole, usroUser);
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Service.Delete(id);
  }
}
