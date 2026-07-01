import { ListCommunityTracksStep } from '$/core/steps/list-community-tracks.step';
import { Injectable } from '@nestjs/common';
import { CommunityTracksResponse } from '@streaming-service/model';

@Injectable()
export class ListCommunityTracksWorkflow {
  public constructor(private readonly listCommunityTracksStep: ListCommunityTracksStep) {}

  public async execute(): Promise<CommunityTracksResponse> {
    return this.listCommunityTracksStep.execute();
  }
}
