import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { ArtistTrackController } from '$/gateway/rest/v1/artist/artist-track.controller';
import { Module } from '@nestjs/common';
import { GetTrackArtistWorkflow } from '$/core/workflows/artist/get-track-artist.workflow';
import { FetchTrackArtistStep } from '$/core/steps/fetch-track-artist.step';
import { GetTracksByIdWorkflow } from '$/core/workflows/track/get-tracks-by-id.workflow';
import { FetchTracksByIdStep } from '$/core/steps/fetch-tracks-by-id.step';
import { GetTracksByArtistIdWorkflow } from '$/core/workflows/track/get-tracks-by-artist-id.workflow';
import { FetchTrackByArtistIdStep } from '$/core/steps/fetch-track-by-artist-id.step';

@Module({
  imports: [JamendoModule, AuthTokenModule],
  controllers: [ArtistTrackController],
  providers: [
    GetTrackArtistWorkflow,
    FetchTrackArtistStep,
    GetTracksByIdWorkflow,
    FetchTracksByIdStep,
    GetTracksByArtistIdWorkflow,
    FetchTrackByArtistIdStep,
  ],
})
export class ArtistTrackModule {}
