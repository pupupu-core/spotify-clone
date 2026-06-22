import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthTokenService } from './auth-token.service';
import { APP_CONFIG } from '$/shared/config/app.config';

@Module({
  imports: [
    JwtModule.register({
      secret: APP_CONFIG.auth.jwt.secret,
      signOptions: {
        expiresIn: APP_CONFIG.auth.jwt.accessExpiresIn,
      },
    }),
  ],
  providers: [AuthTokenService],
  exports: [AuthTokenService],
})
export class AuthTokenModule {}
