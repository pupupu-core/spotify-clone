import { FetchTrackDiscoveryStep } from '$/core/steps/fetch-track-discovery.step';
import { Injectable } from '@nestjs/common';
import { TrackDiscoveryResponse } from '@streaming-service/model';

@Injectable()
export class GetTrackDiscoveryWorkflow {
  public constructor(private readonly fetchTrackDiscoveryStep: FetchTrackDiscoveryStep) {}
  public async execute(): Promise<TrackDiscoveryResponse> {
    return await this.fetchTrackDiscoveryStep.execute();
  }
}
