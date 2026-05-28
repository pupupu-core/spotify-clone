import { Injectable } from '@nestjs/common';
import { AuthSession } from '../models/auth/auth-session.model';

interface IssueAuthSessionInput {
  id: string;
}

@Injectable()
export class IssueAuthSessionStep {
  public async execute(input: IssueAuthSessionInput): Promise<AuthSession> {
    return {
      accessToken: `mock-access-token${input.id}`,
      refreshToken: 'mock-refresh-token',
    };
  }
}
