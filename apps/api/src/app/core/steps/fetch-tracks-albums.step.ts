import { Injectable } from '@nestjs/common';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { AlbumResponse } from '@streaming-service/model';

@Injectable()
export class FetchTracksAlbumStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(albumId: number): Promise<AlbumResponse> {
    const [trackList] = await this.jamendoClient.listTracksAlbums({
      order: 'track_position',
      albumsId: [albumId],
    });

    if (!trackList) {
      throw new Error('No album tracks found');
    }

    return trackList;
  }
}
