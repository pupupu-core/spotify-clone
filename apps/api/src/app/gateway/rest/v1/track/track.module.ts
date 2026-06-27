import { Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { GetTrackDiscoveryWorkflow } from '$/core/workflows/track/get-track-discovery.workflow';
import { FetchTrackDiscoveryStep } from '$/core/steps/fetch-track-discovery.step';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { UploadTrackWorkflow } from '$/core/workflows/track/upload-track.workflow';
import { UploadTrackStep } from '$/core/steps/upload-track.step';

@Module({
  imports: [JamendoModule, AuthTokenModule],
  controllers: [TrackController],
  providers: [
    GetTrackDiscoveryWorkflow,
    UploadTrackWorkflow,
    FetchTrackDiscoveryStep,
    AccessTokenGuard,
    UploadTrackStep,
  ],
})
export class TrackModule {}
