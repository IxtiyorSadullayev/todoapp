import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: [
  //     'http://localhost:5173',
  //     'http://localhost:3000',
  //     'http://45.138.158.80:3003',
  //   ],
  //   methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true,
  // })

  app.use(
    cors({
      origin: ['http://localhost:5173', 'http://localhost:5173'],
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
    })
  )

  const config = new DocumentBuilder()
    .setTitle("O'quvchilar uchun fake ma'lumotlardan iborat bo'lgan Server Sayt")
    .setDescription("Barcha ma'lumotlar nazorat qilinmaydi")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT || 3003, '0.0.0.0');

}
bootstrap();
