import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.findOne({where: {login: createUserDto.login}})
    if (user){
      throw new HttpException("Bu foydalanuvchi oldin yaratilgan", HttpStatus.BAD_REQUEST)
    }
    const newuser = this.userRepo.create(createUserDto)
    await this.userRepo.save(newuser)
    const payload = {user_id: newuser.id}
    return {
      status: 201,
      message: "User yaratildi",
      token: await this.jwtService.signAsync(payload, {expiresIn: '2h'})
    };
  }

  async findAll() {
    return await this.userRepo.find({select: {birthday: true, fullname: true, phoneNumber: true, id: true, created: true, updated: true}});
  }

  async findOne(id: number, req) {
    const user_id = req['user'].user_id
    if (user_id != id){
      throw new HttpException("Kechirasiz ushbu foydalanuvchini olishga ruxsat sizda yo'q", HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepo.findOne({where: {id: id}})
    if (!user){
      throw new HttpException("Kechirasiz ushbu foydalanuvchi topilmadi", HttpStatus.NOT_FOUND)
    } 
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, req) {
    const user_id = req['user'].user_id
    if (user_id != id){
      throw new HttpException("Kechirasiz ushbu foydalanuvchini o'zgartirishga ruxsat sizda yo'q", HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepo.findOne({where: {id: id}})
    if (!user){
      throw new HttpException("Kechirasiz ushbu foydalanuvchi topilmadi", HttpStatus.NOT_FOUND)
    } 
    await this.userRepo.update(id, updateUserDto)
    return `This action updates a #${id} user`;
  }

  async remove(id: number, req) {
    const user_id = req['user'].user_id
    if (user_id != id){
      throw new HttpException("Kechirasiz ushbu foydalanuvchini o'chirishga ruxsat sizda yo'q", HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepo.findOne({where: {id: id}})
    if (!user){
      throw new HttpException("Kechirasiz ushbu foydalanuvchi topilmadi", HttpStatus.NOT_FOUND)
    } 
    await this.userRepo.delete(id)
    return `This action removes a #${id} user`;
  }

  async login(loginDto: LoginDto){
    const user = await this.userRepo.findOne({where: {login: loginDto.login}})
    if (!user || user.password !=loginDto.password){
      throw new HttpException("Kechirasiz ushbu foydalanuvchi topilmadi", HttpStatus.NOT_FOUND)
    } 
    const payload = {user_id: user.id}
    return {
      status: 200,
      message: "User yo'naltirilayapdi",
      token: await this.jwtService.signAsync(payload, {expiresIn: '2h'})
    };
  }
}
