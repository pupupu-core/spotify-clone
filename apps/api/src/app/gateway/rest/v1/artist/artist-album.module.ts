import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { Module } from '@nestjs/common';
import { GetAlbumArtistWorkflow } from '$/core/workflows/artist/get-albums-artist.workflow';
import { FetchAlbumsArtistStep } from '$/core/steps/fetch-albums-artist.step';
import { ArtistAlbumsController } from '$/gateway/rest/v1/artist/artist-albums.controller';
import { GetTracksAlbumsWorkflow } from '$/core/workflows/albums/get-tracks-albums.workflow';
import { FetchTracksAlbumsStep } from '$/core/steps/fetch-tracks-albums.step';

@Module({
  imports: [JamendoModule, AuthTokenModule],
  controllers: [ArtistAlbumsController],
  providers: [
    GetAlbumArtistWorkflow,
    FetchAlbumsArtistStep,
    GetTracksAlbumsWorkflow,
    FetchTracksAlbumsStep,
  ],
})
export class ArtistAlbumModule {}
