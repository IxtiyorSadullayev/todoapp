import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { UsersGuard } from 'src/users/users.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(UsersGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createLessonDto: CreateLessonDto, @Request() req) {
    return this.lessonsService.create(createLessonDto, req);
  }

  @UseGuards(UsersGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Request() req) {
    return this.lessonsService.findAll(req);
  }

  @UseGuards(UsersGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.lessonsService.findOne(+id, req);
  }

  @UseGuards(UsersGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto, @Request() req) {
    return this.lessonsService.update(+id, updateLessonDto, req);
  }

  @UseGuards(UsersGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.lessonsService.remove(+id, req);
  }
}
