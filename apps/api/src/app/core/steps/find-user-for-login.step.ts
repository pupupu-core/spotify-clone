import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { AuthUser } from '../models/user.model';

export interface FindUserForLoginInput {
  email: string;
}

@Injectable()
export class FindUserForLoginStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({ email }: FindUserForLoginInput): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
