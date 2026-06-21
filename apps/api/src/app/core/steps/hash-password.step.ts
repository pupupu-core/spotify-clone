import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

interface HashPasswordInput {
  password: string;
}

interface HashPasswordResult {
  passwordHash: string;
}

@Injectable()
export class HashPasswordStep {
  public async execute({ password }: HashPasswordInput): Promise<HashPasswordResult> {
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19 * 1024,
      timeCost: 2,
      parallelism: 1,
    });

    return { passwordHash };
  }
}
