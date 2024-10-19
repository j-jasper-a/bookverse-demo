import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { Application } from 'express';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions/all-exceptions.filter';

const server: Application = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.init();
}

bootstrap().catch((err) => {
  console.error('NestJS bootstrap failed:', err);
  process.exit(1);
});

if (process.env.NODE_ENV === 'development') {
  const port = parseInt(process.env.PORT || '3000', 10);
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default server;
