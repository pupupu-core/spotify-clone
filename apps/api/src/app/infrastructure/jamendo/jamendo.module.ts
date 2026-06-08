import { Module } from '@nestjs/common';
import { BaseHttpModule } from '$/infrastructure/http/base-http.module';
import { JamendoClient } from './jamendo.client';

@Module({
  imports: [BaseHttpModule],
  providers: [JamendoClient],
  exports: [JamendoClient],
})
export class JamendoModule {}
