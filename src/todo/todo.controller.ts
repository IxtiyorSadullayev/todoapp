import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UsersGuard } from 'src/users/users.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todoService.create(createTodoDto, req);
  }

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @Get()
  findAll(@Request() req) {
    return this.todoService.findAll(req);
  }


  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.todoService.findOne(+id, req);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
