import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private Service: RolesService) {}

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
    @Body('roleId') roleId,
    @Body('roleName') roleName: string,
  ) {
    return await this.Service.Create(roleId, roleName);
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('roleName') roleName: string,
  ) {
    return await this.Service.Update(id, roleName);
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Service.Delete(id);
  }
}
