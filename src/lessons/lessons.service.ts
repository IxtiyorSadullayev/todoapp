import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {

  constructor(
    @InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>,
  ) { }


  async create(createLessonDto: CreateLessonDto) {
    const lesson = await this.lessonRepo.findOne({ where: { title: createLessonDto.title } })
    if (lesson) {
      throw new HttpException("Kechirasiz ushbu fayl oldin yaratilgan", HttpStatus.BAD_REQUEST)
    }
    const newlesson = this.lessonRepo.create(createLessonDto)
    await this.lessonRepo.save(newlesson);
    return newlesson;
  }

  async findAll() {
    return await this.lessonRepo.find();
  }

  async findOne(id: number) {
    try {
      const lesson = await this.lessonRepo.findOne({ where: { id: id } })
      if (!lesson) {
        throw new HttpException("Kechirasiz ushbu fayl topilmadi", HttpStatus.NOT_FOUND)
      }
      return await this.lessonRepo.findOne({ where: { id: id } });
    }
    catch {
      throw new HttpException("Kechirasi ma'lumotni olishda hatolik mavjud", HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    try{
      const lesson = await this.lessonRepo.findOne({where: {id: id}})
      if (!lesson){
        throw new HttpException("Kechirasiz ushbu lesson topilmadi", HttpStatus.NOT_FOUND)
      }
      await this.lessonRepo.update(id, updateLessonDto)
      return `Ushbu ${lesson.id}-idli ma'lumot yangilandi.`
    }
    catch(e){
      throw new HttpException("Kechirasiz ma'lumotni o'zgartirishda hatolik bo'ldi "+e, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try{
      const lesson = await this.lessonRepo.findOne({where: {id: id}})
      if (!lesson){
        throw new HttpException("Kechirasiz ushbu lesson topilmadi", HttpStatus.NOT_FOUND)
      }
      await this.lessonRepo.delete(id)
      return `Ushbu ${lesson.id}-idli ma'lumot o'chirildi.`
    }
    catch(e){
      throw new HttpException("Kechirasiz ma'lumotni o'chirishda hatolik bo'ldi "+e, HttpStatus.BAD_REQUEST)
    }
  }
}
