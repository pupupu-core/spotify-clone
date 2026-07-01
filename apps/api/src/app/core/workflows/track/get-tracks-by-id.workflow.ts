import { Injectable } from '@nestjs/common';
import { FetchTracksByIdStep } from '$/core/steps/fetch-tracks-by-id.step';
import { TrackResponse } from '@streaming-service/model';

@Injectable()
export class GetTracksByIdWorkflow {
  constructor(private readonly step: FetchTracksByIdStep) {}

  public async execute(trackIds: number[]): Promise<TrackResponse[]> {
    return this.step.execute(trackIds);
  }
}
