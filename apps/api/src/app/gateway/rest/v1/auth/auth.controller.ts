import { Controller, Get, Post } from '@nestjs/common';

import { API_ENDPOINTS } from '@streaming-service/config';
import { AuthTokenResponse } from '@streaming-service/model';

import { OPENAPI_CONFIG } from '../../../../shared/config/openapi.config';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../../../core/workflows/auth/auth.service';

@ApiTags(OPENAPI_CONFIG.tags.auth)
@Controller({
  path: API_ENDPOINTS.auth.serverPath,
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(API_ENDPOINTS.authLogin.serverPath)
  public login(): AuthTokenResponse {
    return this.authService.login();
  }

  @Post(API_ENDPOINTS.authLogout.serverPath)
  public logout(): AuthTokenResponse {
    return this.authService.logout();
  }

  @Post(API_ENDPOINTS.authRegister.serverPath)
  public register(): AuthTokenResponse {
    return this.authService.register();
  }

  @Post(API_ENDPOINTS.authRefresh.serverPath)
  public refresh(): AuthTokenResponse {
    return this.authService.refresh();
  }

  @Get(API_ENDPOINTS.authMe.serverPath)
  public me(): AuthTokenResponse {
    return this.authService.me();
  }
}
