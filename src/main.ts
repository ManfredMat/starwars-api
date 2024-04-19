import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JWT_SECRET, PORT } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  Logger.log(`Server running on port ${process.env.PORT}`)
}
bootstrap();
