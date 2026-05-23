import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { PrismaModule } from '../../../../infrastructure/prisma/prisma.module';
import { FindUserForLoginStep } from '../../../../core/steps/find-user-for-login.step';
import { VerifyLoginPasswordStep } from '../../../../core/steps/verify-login-password.step';
import { IssueAuthSessionStep } from '../../../../core/steps/issue-auth-session.step';
import { LoginUserWorkflow } from '../../../../core/workflows/auth/login-user.workflow';
import { LogoutUserWorkflow } from '../../../../core/workflows/auth/logout-user.workflow';
import { InvalidateUserSessionStep } from '../../../../core/steps/invalidate-user-session.step';
import { RegisterWorkflow } from '../../../../core/workflows/auth/register-user.workflow';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    LoginUserWorkflow,
    LogoutUserWorkflow,
    RegisterWorkflow,
    FindUserForLoginStep,
    VerifyLoginPasswordStep,
    IssueAuthSessionStep,
    InvalidateUserSessionStep,
  ],
})
export class AuthModule {}
