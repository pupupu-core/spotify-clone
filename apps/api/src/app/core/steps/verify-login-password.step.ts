import { Injectable } from '@nestjs/common';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

export interface VerifyLoginPasswordInput {
  plainPassword: string;
  passwordHash: string;
}

@Injectable()
export class VerifyLoginPasswordStep {
  public async execute({ plainPassword, passwordHash }: VerifyLoginPasswordInput): Promise<void> {
    // TODO: compare plainPassword with passwordHash using dedicated lib
    if (plainPassword !== passwordHash) {
      throw new InvalidCredentialsError();
    }
  }
}
