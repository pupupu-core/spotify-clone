import { APP_HTTP_CONFIG } from '$/shared/config/http.config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BaseHttpClient } from './base-http.client';

@Module({
  imports: [HttpModule.register(APP_HTTP_CONFIG.AXIOS)],
  providers: [BaseHttpClient],
  exports: [BaseHttpClient],
})
export class BaseHttpModule {}
