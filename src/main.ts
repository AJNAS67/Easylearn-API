import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({ origin: 'https://easylearn.store', credentials: true });

  await app.listen(3000);
}
bootstrap();
https://easylearn.store