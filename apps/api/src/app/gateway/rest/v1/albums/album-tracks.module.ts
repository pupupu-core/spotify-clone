import { Module } from '@nestjs/common';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { GetTracksAlbumWorkflow } from '$/core/workflows/albums/get-tracks-album.workflow';
import { FetchTracksAlbumStep } from '$/core/steps/fetch-tracks-album.step';
import { AccessTokenGuard } from '$/gateway/rest/guards/access-token.guard';
import { AlbumTracksController } from '$/gateway/rest/v1/albums/album-tracks.controller';
import { GetTracksByIdWorkflow } from '$/core/workflows/track/get-tracks-by-id.workflow';
import { FetchTracksByIdStep } from '$/core/steps/fetch-tracks-by-id.step';
import { FetchTrackByAlbumIdStep } from '$/core/steps/fetch-track-by-album-id.step';

@Module({
  imports: [JamendoModule, AuthTokenModule],
  controllers: [AlbumTracksController],
  providers: [
    GetTracksAlbumWorkflow,
    FetchTracksAlbumStep,
    FetchTrackByAlbumIdStep,
    AccessTokenGuard,
    GetTracksByIdWorkflow,
    FetchTracksByIdStep,
  ],
})
export class AlbumTracksModule {}
