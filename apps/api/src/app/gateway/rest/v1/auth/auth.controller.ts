import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';

import { API_ENDPOINTS } from '@streaming-service/config';
import { AuthTokenResponse } from '@streaming-service/model';
import { OPENAPI_CONFIG } from '../../../../shared/config/openapi.config';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { LoginUserWorkflow } from '../../../../core/workflows/auth/login-user.workflow';
import { LogoutUserWorkflow } from '../../../../core/workflows/auth/logout-user.workflow';
import { RegisterUserWorkflow } from '../../../../core/workflows/auth/register-user.workflow';
import { RegisterDto } from './dtos/register.dto';
import { RefreshUserSessionWorkflow } from '$/core/workflows/auth/refresh-user-session.workflow';
import type { Request, Response } from 'express';
import { AuthCookieService } from './auth-cookie.service';

@ApiTags(OPENAPI_CONFIG.tags.auth)
@Controller({
  path: API_ENDPOINTS.AUTH.basePath,
  version: '1',
})
export class AuthController {
  constructor(
    private readonly loginUserWorkflow: LoginUserWorkflow,
    private readonly logoutUserWorkflow: LogoutUserWorkflow,
    private readonly registerUserWorkflow: RegisterUserWorkflow,
    private readonly refreshUserSessionWorkflow: RefreshUserSessionWorkflow,
    private readonly authCookieService: AuthCookieService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(API_ENDPOINTS.AUTH.LOGIN.serverPath)
  public async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthTokenResponse> {
    const { refreshToken, accessToken } = await this.loginUserWorkflow.execute(dto);

    this.authCookieService.setRefreshToken(response, refreshToken);

    return { accessToken };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(API_ENDPOINTS.AUTH.LOGOUT.serverPath)
  public async logout(
    @Req() { cookies }: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    this.authCookieService.clearRefreshToken(response);

    return this.logoutUserWorkflow.execute(cookies.refreshToken);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(API_ENDPOINTS.AUTH.REGISTER.serverPath)
  public async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthTokenResponse> {
    const { refreshToken, accessToken } = await this.registerUserWorkflow.execute(dto);

    this.authCookieService.setRefreshToken(response, refreshToken);

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post(API_ENDPOINTS.AUTH.REFRESH.serverPath)
  public refresh(@Req() { cookies }: Request): Promise<AuthTokenResponse> {
    return this.refreshUserSessionWorkflow.execute(cookies.refreshToken);
  }
}
