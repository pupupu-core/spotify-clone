import { Injectable } from '@nestjs/common';
import { AuthProvider } from '../../../../generated/prisma/client';
import { LocalEmailAlreadyTakenError } from '../errors/local-email-already-taken.error';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';

export interface EnsureLocalEmailIsAvailableInput {
  email: string;
}

@Injectable()
export class EnsureLocalEmailIsAvailableStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({ email }: EnsureLocalEmailIsAvailableInput): Promise<void> {
    const authIdentity = await this.prisma.authIdentity.findUnique({
      where: {
        provider_email: {
          provider: AuthProvider.EMAIL_PASSWORD,
          email: email.trim().toLowerCase(),
        },
      },
      select: {
        id: true,
      },
    });

    if (authIdentity) {
      throw new LocalEmailAlreadyTakenError();
    }
  }
}
