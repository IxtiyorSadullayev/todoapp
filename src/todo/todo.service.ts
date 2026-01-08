import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
    private userService: UsersService
  ){}

  async create(createTodoDto: CreateTodoDto, req) {
    try{
      const todo = await this.todoRepo.findOne({where: {title: createTodoDto.title, description: createTodoDto.description}})
      if (todo){
        throw new HttpException("Kechirasiz ushbu todo oldin yaratilgan", HttpStatus.BAD_REQUEST)
      }
      const userid = req['user'].user_id 
      const user =await this.userService.findOne(userid, req)
      const newtodo = this.todoRepo.create(createTodoDto)
      newtodo.user = user
      await this.todoRepo.save(newtodo)
      return newtodo;
    }
    catch(e){
      throw new HttpException("Todo Ma'lumotni yaratishda hatolik bo'ldi \n"+e, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(req) {
    try{
      const userid = req['user'].user_id
      const todos = await this.todoRepo.find({where: {user: {id: userid}}})
      return todos;
    }
    catch(e){
      throw new HttpException("Todo Ma'lumotni yaratishda hatolik bo'ldi \n"+e, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number, req) {
    try{
      const userid = req['user'].user_id
      const todo = await this.todoRepo.findOne({where: {user: {id: userid}, id: id}})
      if (!todo){
        throw new HttpException("Kechirasiz ushbu todo topilmadi", HttpStatus.NOT_FOUND)
      }
      return todo;
    }
    catch(e){
      throw new HttpException("Todo Ma'lumotni yaratishda hatolik bo'ldi \n"+e, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try{
      const todo = await this.todoRepo.findOne({where: {id: id}})
      if (!todo){
        throw new HttpException("Kechirasiz ushbu todo topilmadi", HttpStatus.NOT_FOUND)
      }
      await this.todoRepo.update(id, updateTodoDto)
      return `${todo.id}-idli Todo ma'lumoti yangilandi`;
    }
    catch(e){
      throw new HttpException("Todo Ma'lumotni yaratishda hatolik bo'ldi \n"+e, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try{
      const todo = await this.todoRepo.findOne({where: {id: id}})
      if (!todo){
        throw new HttpException("Kechirasiz ushbu todo topilmadi", HttpStatus.NOT_FOUND)
      }
      await this.todoRepo.delete(id)
      return `${todo.id}-idli Todo ma'lumoti o'chirildi`;
    }
    catch(e){
      throw new HttpException("Todo Ma'lumotni yaratishda hatolik bo'ldi \n"+e, HttpStatus.BAD_REQUEST)
    }
  }
}
