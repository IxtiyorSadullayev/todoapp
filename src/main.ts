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
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  })
  await app.listen(process.env.PORT || 3003, '0.0.0.0');

  console.log(`Server started on port ${port}`)
}
bootstrap();
