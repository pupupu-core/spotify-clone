import { RetrieveAccountMeStep } from '$/core/steps/retrieve-account-me.step';
import { Injectable } from '@nestjs/common';
import { AccountMeResponse } from '@streaming-service/model';

interface GetAccountMeQuery {
  accountId: string;
}

@Injectable()
export class GetAccountMeWorkflow {
  public constructor(private readonly retrieveAccountMeStep: RetrieveAccountMeStep) {}
  public async execute({ accountId }: GetAccountMeQuery): Promise<AccountMeResponse> {
    return this.retrieveAccountMeStep.execute({ accountId });
  }
}
