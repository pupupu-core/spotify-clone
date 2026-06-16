import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { PrismaModule } from '$/infrastructure/prisma/prisma.module';
import { GetAccountMeWorkflow } from '$/core/workflows/account/get-current-me-account.workflow';
import { RetrieveAccountMeStep } from '$/core/steps/retrieve-account-me.step';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';

@Module({
  imports: [PrismaModule, AuthTokenModule],
  controllers: [AccountController],
  providers: [GetAccountMeWorkflow, RetrieveAccountMeStep, AccessTokenGuard],
})
export class AccountModule {}
