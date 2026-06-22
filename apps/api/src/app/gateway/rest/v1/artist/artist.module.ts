import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { ArtistController } from '$/gateway/rest/v1/artist/artist.controller';
import { Module } from '@nestjs/common';
import { GetTrackArtistWorkflow } from '$/core/workflows/artist/get-track-artist.workflow';
import { FetchTrackArtistStep } from '$/core/steps/fetch-track-artist.step';

@Module({
  imports: [JamendoModule, AuthTokenModule],
  controllers: [ArtistController],
  providers: [GetTrackArtistWorkflow, FetchTrackArtistStep],
})
export class ArtistModule {}
