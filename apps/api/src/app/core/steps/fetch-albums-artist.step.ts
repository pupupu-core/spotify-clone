import { Injectable } from '@nestjs/common';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { ArtistAlbumsResponse } from '@streaming-service/model';

@Injectable()
export class FetchAlbumsArtistStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(artistId: number): Promise<ArtistAlbumsResponse> {
    const [popularAlbums] = await this.jamendoClient.listArtistAlbums({
      order: 'popularity_total',
      artistId: [artistId],
      limit: 10,
    });

    if (!popularAlbums) {
      throw new Error('Artist album not found');
    }

    return popularAlbums;
  }
}
