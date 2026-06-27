import { Injectable } from '@nestjs/common';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { AlbumResponse } from '@streaming-service/model';

@Injectable()
export class FetchTracksAlbumsStep {
  constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(albumIds: number[]): Promise<AlbumResponse[]> {
    const albums = await this.jamendoClient.listTracksAlbums({
      order: 'popularity_total',
      albumsId: albumIds,
    });

    return albums;
  }
}
