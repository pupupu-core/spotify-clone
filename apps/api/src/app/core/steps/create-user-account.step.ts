import { Injectable } from '@nestjs/common';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { EmailAlreadyTakenError } from '../errors/email-already-taken.error';
import { PrismaClientKnownRequestError } from '../../../../generated/prisma/internal/prismaNamespace';

interface CreateUserAccountInput {
  email: string;
  passwordHash: string;
}

interface CreateUserAccountResult {
  id: string;
}

@Injectable()
export class CreateUserAccountStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({
    email,
    passwordHash,
  }: CreateUserAccountInput): Promise<CreateUserAccountResult> {
    try {
      return await this.prisma.user.create({
        data: {
          email: email.trim().toLowerCase(),
          password: passwordHash,
        },
        select: {
          id: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new EmailAlreadyTakenError();
      }
    }
  }
}
