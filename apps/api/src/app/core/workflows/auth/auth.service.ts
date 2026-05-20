import { Injectable } from '@nestjs/common';
import { AuthResponse } from '@streaming-service/model';

@Injectable()
export class AuthService {
  public ping(): AuthResponse {
    return { ping: 'pong' };
  }

  public login(): AuthResponse {
    return { ping: 'login' };
  }

  public logout(): AuthResponse {
    return { ping: 'logout' };
  }

  public register(): AuthResponse {
    return { ping: 'register' };
  }

  public refresh(): AuthResponse {
    return { ping: 'refresh' };
  }

  public me(): AuthResponse {
    return { ping: 'me' };
  }
}
