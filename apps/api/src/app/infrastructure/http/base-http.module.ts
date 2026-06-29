import { HTTP_CLIENT_CONFIG } from '$/shared/config/http-client.config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BaseHttpClient } from './base-http.client';

@Module({
  imports: [HttpModule.register(HTTP_CLIENT_CONFIG.AXIOS)],
  providers: [BaseHttpClient],
  exports: [BaseHttpClient],
})
export class BaseHttpModule {}
