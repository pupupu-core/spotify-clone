import { Injectable } from '@nestjs/common';
import { FetchTrackArtistStep } from '$/core/steps/fetch-track-artist.step';
import { ArtistTracksResponse } from '@streaming-service/model';

@Injectable()
export class GetTrackArtistWorkflow {
  public constructor(private readonly fetchTrackArtistStep: FetchTrackArtistStep) {}

  public async execute(artistId: number): Promise<ArtistTracksResponse> {
    return await this.fetchTrackArtistStep.execute(artistId);
  }
}
