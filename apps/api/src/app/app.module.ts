import { Module } from '@nestjs/common';

import { AuthModule } from './gateway/rest/v1/auth/auth.module';
import { AccountModule } from './gateway/rest/v1/account/account.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CoreErrorFilter } from './gateway/rest/filters/core-error.filter';
import { TrackModule } from './gateway/rest/v1/track/track.module';
import { ArtistTrackModule } from '$/gateway/rest/v1/artist/artist-track.module';
import { ArtistAlbumModule } from '$/gateway/rest/v1/artist/artist-album.module';
import { AlbumTracksModule } from '$/gateway/rest/v1/albums/album-tracks.module';
import { ArtistMusicInfoModule } from '$/gateway/rest/v1/artist/artist-music-info.module';

@Module({
  imports: [
    TrackModule,
    AuthModule,
    AccountModule,
    ArtistTrackModule,
    ArtistAlbumModule,
    AlbumTracksModule,
    ArtistMusicInfoModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: 60_000,
          limit: 10,
        },
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: CoreErrorFilter,
    },
  ],
})
export class AppModule {}
