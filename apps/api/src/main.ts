import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { APP_CONFIG } from './app/shared/config/app.config';
import { initSwagger } from './app/infrastructure/swagger/init-swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix(APP_CONFIG.restGateway.pathPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'https://tryproxy.online',
      'http://localhost:4200',
      'http://localhost:4201',
      'http://localhost:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });

  initSwagger(app);

  await app.listen(APP_CONFIG.http.port, APP_CONFIG.http.host);

  Logger.log(
    `Backend is online: http://localhost:${APP_CONFIG.http.port}${APP_CONFIG.restGateway.pathPrefix}`,
  );
}

void bootstrap();
