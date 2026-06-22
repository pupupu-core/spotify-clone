import { Module } from '@nestjs/common';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { GetTracksAlbumWorkflow } from '$/core/workflows/albums/get-tracks-albums.workflow';
import { FetchTracksAlbumStep } from '$/core/steps/fetch-tracks-albums.step';
import { AccessTokenGuard } from '$/gateway/rest/guards/access-token.guard';

@Module({
  imports: [JamendoModule, AuthTokenModule],
  controllers: [],
  providers: [GetTracksAlbumWorkflow, FetchTracksAlbumStep, AccessTokenGuard],
})
export class AlbumTracksModule {}
