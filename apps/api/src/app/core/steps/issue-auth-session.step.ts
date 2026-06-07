import { Injectable } from '@nestjs/common';
import { AuthSession } from '../models/auth/auth-session.model';

interface IssueAuthSessionInput {
  accountId: string;
}

@Injectable()
export class IssueAuthSessionStep {
  public async execute(input: IssueAuthSessionInput): Promise<AuthSession> {
    return {
      accessToken: `mock-access-token${input.accountId}`,
      refreshToken: 'mock-refresh-token',
    };
  }
}
