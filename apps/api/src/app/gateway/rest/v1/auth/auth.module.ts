import { Module } from '@nestjs/common';

import { AuthService } from '../../../../core/workflows/auth/auth.service';

import { AuthController } from './auth.controller';
import { PrismaModule } from '../../../../infrastructure/prisma/prisma.module';
import { FindUserForLoginStep } from '../../../../core/steps/find-user-for-login.step';
import { VerifyLoginPasswordStep } from '../../../../core/steps/verify-login-password.step';
import { IssueAuthSessionStep } from '../../../../core/steps/issue-auth-session.step';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, FindUserForLoginStep, VerifyLoginPasswordStep, IssueAuthSessionStep],
})
export class AuthModule {}
