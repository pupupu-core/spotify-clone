import { APP_CONFIG } from '$/shared/config/app.config';
import { Injectable } from '@nestjs/common';
import type { Response } from 'express';
import { buildWithApi } from '@streaming-service/utils';
import { API_ENDPOINTS } from '@streaming-service/config';

@Injectable()
export class AuthCookieService {
  public setRefreshToken(response: Response, refreshToken: string): void {
    response.cookie(APP_CONFIG.auth.refreshTokenCookie.name, refreshToken, {
      httpOnly: true,
      secure: APP_CONFIG.isProduction,
      sameSite: 'lax',
      path: buildWithApi({
        path: API_ENDPOINTS.AUTH.basePath,
      }),
      maxAge: APP_CONFIG.auth.refreshTokenCookie.maxAgeMs,
    });
  }

  public clearRefreshToken(response: Response): void {
    response.clearCookie(APP_CONFIG.auth.refreshTokenCookie.name, {
      httpOnly: true,
      secure: APP_CONFIG.isProduction,
      sameSite: 'lax',
      path: buildWithApi({
        path: API_ENDPOINTS.AUTH.basePath,
      }),
    });
  }
}
