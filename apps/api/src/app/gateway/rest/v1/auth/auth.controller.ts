import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';

import { API_ENDPOINTS } from '@streaming-service/config';
import { AuthTokenResponse } from '@streaming-service/model';
import { OPENAPI_CONFIG } from '../../../../shared/config/openapi.config';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { LoginUserWorkflow } from '../../../../core/workflows/auth/login-user.workflow';
import { LogoutUserWorkflow } from '../../../../core/workflows/auth/logout-user.workflow';

@ApiTags(OPENAPI_CONFIG.tags.auth)
@Controller({
  path: API_ENDPOINTS.AUTH.basePath,
  version: '1',
})
export class AuthController {
  constructor(
    private readonly loginUserWorkflow: LoginUserWorkflow,
    private readonly logoutUserWorkflow: LogoutUserWorkflow,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(API_ENDPOINTS.AUTH.LOGIN.serverPath)
  public async login(@Body() dto: LoginDto): Promise<AuthTokenResponse> {
    return this.loginUserWorkflow.execute(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(API_ENDPOINTS.AUTH.LOGOUT.serverPath)
  public async logout(
    @Req() { cookies }: Request & { cookies: Record<string, string | undefined> },
  ): Promise<void> {
    return this.logoutUserWorkflow.execute(cookies.refreshToken);
  }

  // @Post(API_ENDPOINTS.AUTH.REGISTER.serverPath)
  // public register(): AuthTokenResponse {
  //   return this.authService.register();
  // }

  // @Post(API_ENDPOINTS.AUTH.REFRESH.serverPath)
  // public refresh(): AuthTokenResponse {
  //   return this.authService.refresh();
  // }

  // @Get(API_ENDPOINTS.AUTH.ME.serverPath)
  // public me(): AuthTokenResponse {
  //   return this.authService.me();
  // }
}
