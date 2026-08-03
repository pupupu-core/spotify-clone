import { ListRecentlyPlayedStep } from '$/core/steps/list-recently-played.step';
import { Injectable } from '@nestjs/common';
import { RecentlyPlayedResponse } from '@streaming-service/model';

interface ListRecentlyPlayedQuery {
  accountId: string;
}

@Injectable()
export class ListRecentlyPlayedWorkflow {
  public constructor(private readonly listRecentlyPlayedStep: ListRecentlyPlayedStep) {}

  public async execute({ accountId }: ListRecentlyPlayedQuery): Promise<RecentlyPlayedResponse> {
    return this.listRecentlyPlayedStep.execute({ accountId });
  }
}
