import { Injectable } from '@nestjs/common';
import type { AuthTokenResponse } from '@streaming-service/model';

@Injectable()
export class GetUserIdentityWorkflow {
  public async execute(): Promise<AuthTokenResponse> {
    // TODO
    // me workflow
    //   -> retrieve-current-auth-user.step
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }
}
