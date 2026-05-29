import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

export interface InvalidateUserSessionInput {
  refreshToken: string;
}

@Injectable()
export class InvalidateUserSessionStep {
  private readonly logger = new Logger(InvalidateUserSessionStep.name);

  public constructor(private readonly prisma: PrismaService) {}
  public async execute(input: InvalidateUserSessionInput): Promise<void> {
    this.logger.log(`Invalidating session for token: ${input.refreshToken.substring(0, 8)}...`);
    // TODO add auth session table

    return;
  }
}
