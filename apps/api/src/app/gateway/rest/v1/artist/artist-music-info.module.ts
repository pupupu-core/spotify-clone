import { Module } from '@nestjs/common';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { GetMusicInfoArtistWorkflow } from '$/core/workflows/artist/get-music-info-artist.workflow';
import { ArtistMusicInfoController } from '$/gateway/rest/v1/artist/artist-music-info.controller';
import { FetchMusicInfoArtistStep } from '$/core/steps/fetch-music-info-artist.step';

@Module({
  imports: [JamendoModule, AuthTokenModule],
  controllers: [ArtistMusicInfoController],
  providers: [GetMusicInfoArtistWorkflow, FetchMusicInfoArtistStep],
})
export class ArtistMusicInfoModule {}
