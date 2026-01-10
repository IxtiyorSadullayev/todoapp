import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LessonsService {

  constructor(
    @InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>,
    private userService: UsersService
  ) { }


  async create(createLessonDto: CreateLessonDto, req) {
    try {
      const userid = req['user'].user_id;
      const user = await this.userService.findOne(userid, req)
      const lesson = await this.lessonRepo.findOne({ where: { title: createLessonDto.title } })
      if (lesson) {
        throw new HttpException("Kechirasiz ushbu fayl oldin yaratilgan", HttpStatus.BAD_REQUEST)
      }
      const newlesson = this.lessonRepo.create(createLessonDto)
      newlesson.user = user;
      await this.lessonRepo.save(newlesson);
      return newlesson;
    }
    catch (err) {
      throw new HttpException("Lesson yaratishda muammoga duch kelindi\n" + err, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(req) {
    try{
      const userid = req['user'].user_id
      return await this.lessonRepo.find({where: {user: {id: userid}}});
    }
    catch(err){
      throw new HttpException("Lessonlarni olishda muammoga duch kelindi\n" + err, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number, req) {
    try {
      const userid = req['user'].user_id
      const lesson = await this.lessonRepo.findOne({ where: { id: id } })
      if (!lesson) {
        throw new HttpException("Kechirasiz ushbu fayl topilmadi", HttpStatus.NOT_FOUND)
      }
      return await this.lessonRepo.findOne({ where: { id: id, user: {id: userid} } });
    }
    catch {
      throw new HttpException("Lesson ma'lumotni olishda hatolik mavjud", HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateLessonDto: UpdateLessonDto, req) {
    try {
      const userid = req['user'].user_id
      const lesson = await this.lessonRepo.findOne({ where: { id: id, user: {id: userid}} })
      if (!lesson) {
        throw new HttpException("Kechirasiz ushbu lesson topilmadi", HttpStatus.NOT_FOUND)
      }
      await this.lessonRepo.update(id, updateLessonDto)
      return `Ushbu ${lesson.id}-idli ma'lumot yangilandi.`
    }
    catch (e) {
      throw new HttpException("Kechirasiz ma'lumotni o'zgartirishda hatolik bo'ldi " + e, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number, req) {
    try {
      const userid = req['user'].user_id
      const lesson = await this.lessonRepo.findOne({ where: { id: id, user:{id: userid} } })
      if (!lesson) {
        throw new HttpException("Kechirasiz ushbu lesson topilmadi", HttpStatus.NOT_FOUND)
      }
      await this.lessonRepo.delete(id)
      return `Ushbu ${lesson.id}-idli ma'lumot o'chirildi.`
    }
    catch (e) {
      throw new HttpException("Kechirasiz ma'lumotni o'chirishda hatolik bo'ldi " + e, HttpStatus.BAD_REQUEST)
    }
  }
}
