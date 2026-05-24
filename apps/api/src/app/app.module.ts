import { Module } from '@nestjs/common';

import { AuthModule } from './gateway/rest/v1/auth/auth.module';
import { UserModule } from './gateway/rest/v1/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {}
