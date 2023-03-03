import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateClientDto } from '../cliente/dto/create-client.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.userService.create(createUserDto, createClientDto);
  }

  @Get()
  async findAll(@Param() params) {
    return this.userService.listUsers(params);
  }

  @Delete('delete')
  async remove(@Query('id') id: number | number[]) {
    return this.userService.remove(id);
  }
}
