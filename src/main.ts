import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("O'quvchilar uchun fake ma'lumotlardan iborat bo'lgan Server Sayt")
    .setDescription("Barcha ma'lumotlar nazorat qilinmaydi")
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const port = (process.env.PORT || 3003, '0.0.0.0')
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://45.138.158.80:3003',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
  await app.listen(process.env.PORT || 3003, '0.0.0.0');

  console.log(`Server started on port ${port}`)
}
bootstrap();
