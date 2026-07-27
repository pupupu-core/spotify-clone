import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { PrismaModule } from '$/infrastructure/prisma/prisma.module';
import { GetAccountMeWorkflow } from '$/core/workflows/account/get-current-me-account.workflow';
import { RetrieveAccountMeStep } from '$/core/steps/retrieve-account-me.step';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { ListAccountTracksWorkflow } from '$/core/workflows/account/list-account-tracks.workflow';
import { ListAccountTracksStep } from '$/core/steps/list-account-tracks.step';
import { ListRecentlyPlayedWorkflow } from '$/core/workflows/account/list-recently-played.workflow';
import { RecordRecentlyPlayedWorkflow } from '$/core/workflows/account/record-recently-played.workflow';
import { ListRecentlyPlayedStep } from '$/core/steps/list-recently-played.step';
import { RecordRecentlyPlayedStep } from '$/core/steps/record-recently-played.step';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';

@Module({
  imports: [PrismaModule, AuthTokenModule, JamendoModule],
  controllers: [AccountController],
  providers: [
    GetAccountMeWorkflow,
    ListAccountTracksWorkflow,
    ListRecentlyPlayedWorkflow,
    RecordRecentlyPlayedWorkflow,
    RetrieveAccountMeStep,
    ListAccountTracksStep,
    ListRecentlyPlayedStep,
    RecordRecentlyPlayedStep,
    AccessTokenGuard,
  ],
})
export class AccountModule {}
