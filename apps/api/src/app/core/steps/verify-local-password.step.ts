import { Injectable } from '@nestjs/common';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

export interface VerifyLocalPasswordInput {
  plainPassword: string;
  passwordHash: string;
}

@Injectable()
export class VerifyLocalPasswordStep {
  public async execute({ plainPassword, passwordHash }: VerifyLocalPasswordInput): Promise<void> {
    // TODO: compare plainPassword with passwordHash using dedicated lib
    if (plainPassword !== passwordHash) {
      throw new InvalidCredentialsError();
    }
  }
}
