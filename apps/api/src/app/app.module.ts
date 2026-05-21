import { Module } from '@nestjs/common';

import { AuthModule } from './gateway/rest/v1/auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
