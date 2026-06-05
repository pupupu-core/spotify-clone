import { Module } from '@nestjs/common';

import { AuthModule } from './gateway/rest/v1/auth/auth.module';
import { UserModule } from './gateway/rest/v1/user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CoreErrorFilter } from './gateway/rest/filters/core-error.filter';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: 60_000,
          limit: 5,
        },
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: CoreErrorFilter,
    },
  ],
})
export class AppModule {}
