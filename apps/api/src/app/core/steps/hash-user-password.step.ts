import { Injectable } from '@nestjs/common';

interface HashUserPasswordInput {
  password: string;
}

interface HashUserPasswordResult {
  passwordHash: string;
}

@Injectable()
export class HashUserPasswordStep {
  public async execute({ password }: HashUserPasswordInput): Promise<HashUserPasswordResult> {
    // TODO implement password hashing
    return { passwordHash: password };
  }
}
