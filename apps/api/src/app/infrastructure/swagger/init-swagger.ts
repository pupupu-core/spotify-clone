import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OPENAPI_CONFIG } from '../../shared/config/openapi.config';
import { INestApplication } from '@nestjs/common';
import { APP_CONFIG } from '../../shared/config/app.config';

export function initSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(OPENAPI_CONFIG.title)
    .setDescription(OPENAPI_CONFIG.description)
    .setVersion(OPENAPI_CONFIG.version)
    .addTag(OPENAPI_CONFIG.tags.auth)
    .addTag(OPENAPI_CONFIG.tags.account)
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    `${APP_CONFIG.restGateway.pathPrefix}/${OPENAPI_CONFIG.path}`,
    app,
    documentFactory,
  );
}
