import { Injectable } from '@nestjs/common';
import type { AuthTokenResponse } from '@streaming-service/model';

@Injectable()
export class AuthWorkflow {
  public register(): AuthTokenResponse {
    // TODO
    // register workflow
    //   -> ensure-user-email-is-available
    //   -> hash-user-password
    //   -> create-user-account
    //   -> issue-auth-session
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }

  public refresh(): AuthTokenResponse {
    // TODO
    // refresh workflow
    //   -> validate-refresh-token
    //   -> issue-auth-session
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }

  public me(): AuthTokenResponse {
    // TODO
    // me workflow
    //   -> retrieve-current-auth-user
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }
}
