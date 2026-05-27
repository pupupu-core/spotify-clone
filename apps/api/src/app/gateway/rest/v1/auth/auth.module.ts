import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { PrismaModule } from '../../../../infrastructure/prisma/prisma.module';
import { FindUserForLoginStep } from '../../../../core/steps/find-user-for-login.step';
import { VerifyLoginPasswordStep } from '../../../../core/steps/verify-login-password.step';
import { IssueAuthSessionStep } from '../../../../core/steps/issue-auth-session.step';
import { LoginUserWorkflow } from '../../../../core/workflows/auth/login-user.workflow';
import { LogoutUserWorkflow } from '../../../../core/workflows/auth/logout-user.workflow';
import { InvalidateUserSessionStep } from '../../../../core/steps/invalidate-user-session.step';
import { RegisterUserWorkflow } from '../../../../core/workflows/auth/register-user.workflow';
import { RefreshUserSessionWorkflow } from '$/core/workflows/auth/refresh-user-session.workflow';
import { HashUserPasswordStep } from '$/core/steps/hash-user-password.step';
import { EnsureUserEmailIsAvailableStep } from '$/core/steps/ensure-user-email-is-available.step';
import { CreateUserAccountStep } from '$/core/steps/create-user-account.step';
import { AuthCookieService } from './auth-cookie.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    LoginUserWorkflow,
    LogoutUserWorkflow,
    RegisterUserWorkflow,
    RefreshUserSessionWorkflow,
    FindUserForLoginStep,
    VerifyLoginPasswordStep,
    IssueAuthSessionStep,
    InvalidateUserSessionStep,
    HashUserPasswordStep,
    EnsureUserEmailIsAvailableStep,
    CreateUserAccountStep,
    AuthCookieService,
  ],
})
export class AuthModule {}
