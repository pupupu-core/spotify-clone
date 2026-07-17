import { Injectable } from '@nestjs/common';
import { FetchTrackByArtistIdStep } from '$/core/steps/fetch-track-by-artist-id.step';
import { TrackResponse } from '@streaming-service/model';

@Injectable()
export class GetTracksByArtistIdWorkflow {
  constructor(private readonly step: FetchTrackByArtistIdStep) {}

  public async execute(artistIds: number[]): Promise<TrackResponse[]> {
    return this.step.execute(artistIds);
  }
}
