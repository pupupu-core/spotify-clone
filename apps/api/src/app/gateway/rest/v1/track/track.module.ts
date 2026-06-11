import { Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { GetTrackDiscoveryWorkflow } from '$/core/workflows/track/get-track-discovery.workflow';
import { FetchTrackDiscoveryStep } from '$/core/steps/fetch-track-discovery.step';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';

@Module({
  imports: [JamendoModule],
  controllers: [TrackController],
  providers: [GetTrackDiscoveryWorkflow, FetchTrackDiscoveryStep],
})
export class TrackModule {}
