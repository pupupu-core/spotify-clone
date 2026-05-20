/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { APP_CONFIG } from './app/shared/config/app.config';
import { initSwagger } from './app/infrastructure/swagger/init-swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(APP_CONFIG.restGateway.pathPrefix);

  initSwagger(app);

  await app.listen(APP_CONFIG.http.port, APP_CONFIG.http.host);

  Logger.log(
    `Backend is online: http://localhost:${APP_CONFIG.http.port}/${APP_CONFIG.restGateway.pathPrefix}`,
  );
}

void bootstrap();
