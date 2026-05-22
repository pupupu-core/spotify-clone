import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { API_ENDPOINTS } from '@streaming-service/config';
import { AuthTokenResponse } from '@streaming-service/model';

import { OPENAPI_CONFIG } from '../../../../shared/config/openapi.config';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../../../core/workflows/auth/auth.service';
import { LoginDto } from './dtos/login.dto';

@ApiTags(OPENAPI_CONFIG.tags.auth)
@Controller({
  path: API_ENDPOINTS.AUTH.basePath,
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post(API_ENDPOINTS.AUTH.LOGIN.serverPath)
  public async login(@Body() dto: LoginDto): Promise<AuthTokenResponse> {
    return this.authService.login(dto);
  }

  @Post(API_ENDPOINTS.AUTH.LOGOUT.serverPath)
  public logout(): { message: string } {
    return this.authService.logout();
  }

  @Post(API_ENDPOINTS.AUTH.REGISTER.serverPath)
  public register(): AuthTokenResponse {
    return this.authService.register();
  }

  @Post(API_ENDPOINTS.AUTH.REFRESH.serverPath)
  public refresh(): AuthTokenResponse {
    return this.authService.refresh();
  }

  @Get(API_ENDPOINTS.AUTH.ME.serverPath)
  public me(): AuthTokenResponse {
    return this.authService.me();
  }
}
