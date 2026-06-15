import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomBytes } from 'node:crypto';

@Injectable()
export class AuthTokenService {
  public constructor(private readonly jwtService: JwtService) {}

  public async issueAccessToken(accountId: string): Promise<string> {
    return this.jwtService.signAsync({
      sub: accountId,
      tokenType: 'access',
    });
  }

  public generateRefreshToken(): string {
    return randomBytes(32).toString('base64url');
  }

  public hashRefreshToken(refreshToken: string): string {
    return createHash('sha256').update(refreshToken).digest('hex');
  }
}
