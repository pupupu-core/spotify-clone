import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { APP_CONFIG } from './app/shared/config/app.config';
import { initSwagger } from './app/infrastructure/swagger/init-swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(APP_CONFIG.restGateway.pathPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(cookieParser());

  initSwagger(app);

  await app.listen(APP_CONFIG.http.port, APP_CONFIG.http.host);

  Logger.log(
    `Backend is online: http://localhost:${APP_CONFIG.http.port}${APP_CONFIG.restGateway.pathPrefix}`,
  );
}

void bootstrap();
