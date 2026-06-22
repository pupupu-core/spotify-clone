import { Injectable } from '@nestjs/common';
import { FetchMusicInfoArtistStep } from '$/core/steps/fetch-music-info-artist.step';
import { ArtistMusicInfoResponse } from '@streaming-service/model';

@Injectable()
export class GetMusicInfoArtistWorkflow {
  public constructor(private readonly step: FetchMusicInfoArtistStep) {}

  public async execute(artistId: number): Promise<ArtistMusicInfoResponse> {
    return await this.step.execute(artistId);
  }
}
