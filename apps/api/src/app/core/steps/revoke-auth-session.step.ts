import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

export interface RevokeAuthSessionInput {
  refreshToken: string;
}

@Injectable()
export class RevokeAuthSessionStep {
  private readonly logger = new Logger(RevokeAuthSessionStep.name);

  public constructor(private readonly prisma: PrismaService) {}

  public async execute(input: RevokeAuthSessionInput): Promise<void> {
    this.logger.log(`Revoking auth session for token: ${input.refreshToken.substring(0, 8)}...`);
    // TODO revoke auth session by refresh token hash

    return;
  }
}
