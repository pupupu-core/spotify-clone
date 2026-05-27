import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { EmailAlreadyTakenError } from '../errors/email-already-taken.error';

export interface EnsureUserEmailIsAvailableInput {
  email: string;
}

@Injectable()
export class EnsureUserEmailIsAvailableStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({ email }: EnsureUserEmailIsAvailableInput): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
      select: {
        id: true,
      },
    });

    if (user) {
      throw new EmailAlreadyTakenError();
    }
  }
}
