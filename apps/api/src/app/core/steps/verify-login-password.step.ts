import { Injectable } from '@nestjs/common';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

export interface VerifyLoginPasswordInput {
  plainPassword: string;
  passwordHash: string;
}

@Injectable()
export class VerifyLoginPasswordStep {
  public async execute({ plainPassword, passwordHash }: VerifyLoginPasswordInput) {
    if (plainPassword !== passwordHash) {
      throw new InvalidCredentialsError();
    }
  }
}
