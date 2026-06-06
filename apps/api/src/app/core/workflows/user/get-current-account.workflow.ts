import { Injectable } from '@nestjs/common';
import type { AuthTokenResponse } from '@streaming-service/model';

@Injectable()
export class GetCurrentAccountWorkflow {
  public async execute(): Promise<AuthTokenResponse> {
    // TODO
    // get current account workflow
    //   -> retrieve-current-account.step
    return {
      accessToken: 'mock-access-token',
    };
  }
}
