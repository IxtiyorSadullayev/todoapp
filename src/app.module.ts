import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'server.db',
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    JwtModule.register({
      global: true,
      secret: 'my-secret',
      signOptions: {expiresIn: '1h'}
    }),
    TodoModule, UsersModule, LessonsModule],
})
export class AppModule { }
