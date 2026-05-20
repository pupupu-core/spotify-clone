import { Injectable } from '@nestjs/common';
import { AuthTokenResponse } from '@streaming-service/model';

@Injectable()
export class AuthService {
  public login(): AuthTokenResponse {
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }

  public logout(): AuthTokenResponse {
    return;
  }

  public register(): AuthTokenResponse {
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }

  public refresh(): AuthTokenResponse {
    return;
  }

  public me(): AuthTokenResponse {
    return;
  }
}
