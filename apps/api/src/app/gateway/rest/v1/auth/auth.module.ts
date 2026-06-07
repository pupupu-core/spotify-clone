import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { RefreshUserSessionWorkflow } from '$/core/workflows/auth/refresh-user-session.workflow';
import { CreateLocalAccountStep } from '$/core/steps/create-local-account.step';
import { EnsureLocalEmailIsAvailableStep } from '$/core/steps/ensure-local-email-is-available.step';
import { HashPasswordStep } from '$/core/steps/hash-password.step';
import { AuthCookieService } from './auth-cookie.service';
import { PrismaModule } from '$/infrastructure/prisma/prisma.module';
import { LoginUserWorkflow } from '$/core/workflows/auth/login-user.workflow';
import { FindLocalIdentityForLoginStep } from '$/core/steps/find-local-identity-for-login.step';
import { IssueAuthSessionStep } from '$/core/steps/issue-auth-session.step';
import { RevokeAuthSessionStep } from '$/core/steps/revoke-auth-session.step';
import { VerifyLocalPasswordStep } from '$/core/steps/verify-local-password.step';
import { LogoutUserWorkflow } from '$/core/workflows/auth/logout-user.workflow';
import { RegisterUserWorkflow } from '$/core/workflows/auth/register-user.workflow';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    LoginUserWorkflow,
    LogoutUserWorkflow,
    RegisterUserWorkflow,
    RefreshUserSessionWorkflow,
    FindLocalIdentityForLoginStep,
    VerifyLocalPasswordStep,
    IssueAuthSessionStep,
    RevokeAuthSessionStep,
    HashPasswordStep,
    EnsureLocalEmailIsAvailableStep,
    CreateLocalAccountStep,
    AuthCookieService,
  ],
})
export class AuthModule {}
