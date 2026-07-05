import { Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { GetTrackDiscoveryWorkflow } from '$/core/workflows/track/get-track-discovery.workflow';
import { FetchTrackDiscoveryStep } from '$/core/steps/fetch-track-discovery.step';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { UploadTrackWorkflow } from '$/core/workflows/track/upload-track.workflow';
import { UploadTrackStep } from '$/core/steps/upload-track.step';
import { PrismaModule } from '$/infrastructure/prisma/prisma.module';
import { StorageModule } from '$/infrastructure/storage/s3-storage.module';
import { DeleteTrackWorkflow } from '$/core/workflows/track/delete-track.workflow';
import { DeleteTrackStep } from '$/core/steps/delete-track.step';
import { RetrieveTrackAudioWorkflow } from '$/core/workflows/track/retrieve-track-audio.workflow';
import { RetrieveTrackAudioStep } from '$/core/steps/retrieve-track-audio.step';
import { ListCommunityTracksWorkflow } from '$/core/workflows/track/list-community-tracks.workflow';
import { ListCommunityTracksStep } from '$/core/steps/list-community-tracks.step';
import { TrackStreamService } from './track-stream.service';

@Module({
  imports: [JamendoModule, AuthTokenModule, PrismaModule, StorageModule],
  controllers: [TrackController],
  providers: [
    GetTrackDiscoveryWorkflow,
    UploadTrackWorkflow,
    DeleteTrackWorkflow,
    RetrieveTrackAudioWorkflow,
    ListCommunityTracksWorkflow,
    FetchTrackDiscoveryStep,
    AccessTokenGuard,
    UploadTrackStep,
    DeleteTrackStep,
    RetrieveTrackAudioStep,
    ListCommunityTracksStep,
    TrackStreamService,
  ],
})
export class TrackModule {}
