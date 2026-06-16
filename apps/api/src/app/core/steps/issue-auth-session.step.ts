import { Injectable } from '@nestjs/common';
import { AuthTokenPair } from '../models/auth/auth-session.model';
import { AuthTokenService } from '$/infrastructure/token/auth-token.service';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { APP_CONFIG } from '$/shared/config/app.config';

interface IssueAuthSessionInput {
  accountId: string;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class IssueAuthSessionStep {
  public constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute({ accountId }: IssueAuthSessionInput): Promise<AuthTokenPair> {
    const accessToken = await this.authTokenService.issueAccessToken(accountId);
    const refreshToken = this.authTokenService.generateRefreshToken();
    const refreshTokenHash = this.authTokenService.hashRefreshToken(refreshToken);

    await this.prisma.authSession.create({
      data: {
        accountId,
        refreshTokenHash,
        expiresAt: new Date(Date.now() + APP_CONFIG.auth.refreshToken.expiresInMs),
        // TODO
        // userAgent
        // ipAddress
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
