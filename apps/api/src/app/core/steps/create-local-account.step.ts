import { Injectable } from '@nestjs/common';
import { AuthProvider, Prisma } from '../../../../generated/prisma/client';
import { LocalEmailAlreadyTakenError } from '../errors/local-email-already-taken.error';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';

interface CreateLocalAccountInput {
  email: string;
  passwordHash: string;
}

interface CreateLocalAccountResult {
  accountId: string;
}

@Injectable()
export class CreateLocalAccountStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({
    email,
    passwordHash,
  }: CreateLocalAccountInput): Promise<CreateLocalAccountResult> {
    try {
      const account = await this.prisma.account.create({
        data: {
          authIdentities: {
            create: {
              provider: AuthProvider.LOCAL,
              email: email.trim().toLowerCase(),
              passwordHash,
            },
          },
        },
        select: {
          id: true,
        },
      });

      return { accountId: account.id };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new LocalEmailAlreadyTakenError();
      }

      throw error;
    }
  }
}
