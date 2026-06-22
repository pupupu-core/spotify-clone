import { Injectable } from '@nestjs/common';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { ArtistMusicInfoResponse } from '@streaming-service/model';

@Injectable()
export class FetchMusicInfoArtistStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(artistId: number): Promise<ArtistMusicInfoResponse> {
    const [musicInfo] = await this.jamendoClient.getArtistMusicInfo([artistId]);

    if (!musicInfo) {
      throw new Error('Music info not found');
    }

    return musicInfo;
  }
}
