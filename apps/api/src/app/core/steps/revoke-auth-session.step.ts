import { Injectable } from '@nestjs/common';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { AuthTokenService } from '$/infrastructure/token/auth-token.service';

export interface RevokeAuthSessionInput {
  refreshToken?: string;
}

@Injectable()
export class RevokeAuthSessionStep {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  public async execute({ refreshToken }: RevokeAuthSessionInput): Promise<void> {
    if (!refreshToken) {
      return;
    }

    const refreshTokenHash = this.authTokenService.hashRefreshToken(refreshToken);

    await this.prisma.authSession.updateMany({
      where: {
        refreshTokenHash,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }
}
