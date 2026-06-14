import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

export interface VerifyLocalPasswordInput {
  plainPassword: string;
  passwordHash: string;
}

@Injectable()
export class VerifyLocalPasswordStep {
  public async execute({ plainPassword, passwordHash }: VerifyLocalPasswordInput): Promise<void> {
    const isValid = await argon2.verify(passwordHash, plainPassword);

    if (!isValid) {
      throw new InvalidCredentialsError();
    }
  }
}
