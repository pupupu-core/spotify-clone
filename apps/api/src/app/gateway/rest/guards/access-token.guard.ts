import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthTokenService } from '$/infrastructure/token/auth-token.service';
import { AuthenticatedRequest } from '../types/authenticated-request.type';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  public constructor(private readonly authTokenService: AuthTokenService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const accessToken = authHeader.slice('Bearer '.length);

    try {
      const payload = await this.authTokenService.verifyAccessToken(accessToken);

      request.accountId = payload.sub;

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
