import { Injectable } from '@nestjs/common';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';

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

  // TODO handle P2002 error
  public async execute({
    email,
    passwordHash,
  }: CreateUserAccountInput): Promise<CreateUserAccountResult> {
    return await this.prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        password: passwordHash,
      },
      select: {
        id: true,
      },
    });
  }
}
