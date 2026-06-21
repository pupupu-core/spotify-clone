import { Injectable } from '@nestjs/common';

import { AuthProvider } from '../../../../generated/prisma/client';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

interface FindLocalIdentityForLoginInput {
  email: string;
}

interface LocalLoginIdentity {
  accountId: string;
  passwordHash: string;
}

@Injectable()
export class FindLocalIdentityForLoginStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({ email }: FindLocalIdentityForLoginInput): Promise<LocalLoginIdentity> {
    const authIdentity = await this.prisma.authIdentity.findUnique({
      where: {
        provider_email: {
          provider: AuthProvider.EMAIL_PASSWORD,
          email: email.trim().toLowerCase(),
        },
      },
      select: {
        accountId: true,
        passwordHash: true,
      },
    });

    if (!authIdentity?.passwordHash) {
      throw new InvalidCredentialsError();
    }

    return {
      accountId: authIdentity.accountId,
      passwordHash: authIdentity.passwordHash,
    };
  }
}
