import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomBytes } from 'node:crypto';
import { InvalidAccessTokenError } from './errors/invalid-access-token.error';

interface AccessTokenPayload {
  sub: string;
  tokenType: 'access';
}
@Injectable()
export class AuthTokenService {
  public constructor(private readonly jwtService: JwtService) {}

  public async issueAccessToken(accountId: string): Promise<string> {
    return this.jwtService.signAsync<AccessTokenPayload>({
      sub: accountId,
      tokenType: 'access',
    });
  }

  public async verifyAccessToken(accessToken: string): Promise<AccessTokenPayload> {
    const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(accessToken);

    if (payload.tokenType !== 'access') {
      throw new InvalidAccessTokenError();
    }

    return payload;
  }

  public generateRefreshToken(): string {
    return randomBytes(32).toString('base64url');
  }

  public hashRefreshToken(refreshToken: string): string {
    return createHash('sha256').update(refreshToken).digest('hex');
  }
}
