import { Injectable } from '@nestjs/common';

interface HashPasswordInput {
  password: string;
}

interface HashPasswordResult {
  passwordHash: string;
}

@Injectable()
export class HashPasswordStep {
  public async execute({ password }: HashPasswordInput): Promise<HashPasswordResult> {
    // TODO implement password hashing
    return { passwordHash: password };
  }
}
