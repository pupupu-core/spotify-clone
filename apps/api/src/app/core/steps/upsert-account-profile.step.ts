import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

interface UpsertAccountProfileInput {
  accountId: string;
  username?: string;
}

@Injectable()
export class UpsertAccountProfileStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({ accountId, username }: UpsertAccountProfileInput): Promise<void> {
    await this.prisma.profile.upsert({
      where: { accountId },
      create: {
        accountId,
        displayName: username,
      },
      update: {
        displayName: username,
      },
    });
  }
}
