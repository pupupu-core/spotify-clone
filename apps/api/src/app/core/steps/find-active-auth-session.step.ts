import { Injectable } from '@nestjs/common';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { InvalidRefreshTokenError } from '../errors/invalid-refresh-token.error';

interface FindActiveAuthSessionInput {
  refreshTokenHash: string;
}

interface FindActiveAuthSessionResult {
  accountId: string;
}

@Injectable()
export class FindActiveAuthSessionStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({
    refreshTokenHash,
  }: FindActiveAuthSessionInput): Promise<FindActiveAuthSessionResult> {
    const session = await this.prisma.authSession.findFirst({
      where: {
        refreshTokenHash,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        accountId: true,
      },
    });

    if (!session) {
      throw new InvalidRefreshTokenError();
    }

    return {
      accountId: session.accountId,
    };
  }
}
