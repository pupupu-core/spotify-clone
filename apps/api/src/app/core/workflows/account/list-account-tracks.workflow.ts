import { ListAccountTracksStep } from '$/core/steps/list-account-tracks.step';
import { Injectable } from '@nestjs/common';
import { AccountTracksResponse } from '@streaming-service/model';

interface ListAccountTracksQuery {
  accountId: string;
}

@Injectable()
export class ListAccountTracksWorkflow {
  public constructor(private readonly listAccountTracksStep: ListAccountTracksStep) {}

  public async execute({ accountId }: ListAccountTracksQuery): Promise<AccountTracksResponse> {
    return this.listAccountTracksStep.execute({ accountId });
  }
}
