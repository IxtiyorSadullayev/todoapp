import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersGuard } from './users.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.usersService.findOne(+id, req);
  }

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(+id, updateUserDto, req);
  }

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.usersService.remove(+id, req);
  }

  @Post("login")
  login(@Body() loginDto: LoginDto){
    return this.usersService.login(loginDto);
  }
}
