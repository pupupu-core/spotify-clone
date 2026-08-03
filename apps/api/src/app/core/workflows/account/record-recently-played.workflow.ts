import { RecordRecentlyPlayedStep } from '$/core/steps/record-recently-played.step';
import { Injectable } from '@nestjs/common';
import {
  RecentlyPlayedTrackResponse,
  RecordRecentlyPlayedTrackRequest,
} from '@streaming-service/model';

interface RecordRecentlyPlayedCommand extends RecordRecentlyPlayedTrackRequest {
  accountId: string;
}

@Injectable()
export class RecordRecentlyPlayedWorkflow {
  public constructor(private readonly recordRecentlyPlayedStep: RecordRecentlyPlayedStep) {}

  public async execute(command: RecordRecentlyPlayedCommand): Promise<RecentlyPlayedTrackResponse> {
    return this.recordRecentlyPlayedStep.execute(command);
  }
}
