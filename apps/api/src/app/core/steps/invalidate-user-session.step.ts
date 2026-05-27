import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export interface InvalidateUserSessionInput {
  refreshToken: string;
}

@Injectable()
export class InvalidateUserSessionStep {
  public constructor(private readonly prisma: PrismaService) {}
  public async execute(input: InvalidateUserSessionInput): Promise<void> {
    console.log('invalidate with:', input);

    // TODO add auth session table
    return;
  }
}
