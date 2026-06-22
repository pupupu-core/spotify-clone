import { Injectable } from '@nestjs/common';
import { AccountMeResponse } from '@streaming-service/model';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { AccountNotFoundError } from '../errors/account-not-found.error';

interface RetrieveAccountMeInput {
  accountId: string;
}

@Injectable()
export class RetrieveAccountMeStep {
  constructor(private readonly prisma: PrismaService) {}

  public async execute({ accountId }: RetrieveAccountMeInput): Promise<AccountMeResponse> {
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
      select: {
        id: true,
        role: true,
        status: true,
        profile: {
          select: {
            id: true,
            handle: true,
            displayName: true,
            email: true,
            country: true,
            city: true,
            avatarUrl: true,
          },
        },
        creatorProfile: {
          select: {
            id: true,
            status: true,
            artistName: true,
            description: true,
          },
        },
      },
    });

    if (!account) {
      throw new AccountNotFoundError();
    }

    return account;
  }
}
