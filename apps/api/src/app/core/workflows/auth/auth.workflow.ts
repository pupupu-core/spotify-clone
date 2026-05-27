import { Injectable } from '@nestjs/common';
import type { AuthTokenResponse } from '@streaming-service/model';

@Injectable()
export class AuthWorkflow {
  public me(): AuthTokenResponse {
    // TODO
    // me workflow
    //   -> retrieve-current-auth-user
    return {
      accessToken: 'mock-access-token',
    };
  }
}
