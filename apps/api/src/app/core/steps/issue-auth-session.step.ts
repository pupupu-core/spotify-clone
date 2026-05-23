import { Injectable } from '@nestjs/common';
import { AuthUser } from '../models/user.model';

type IssueAuthSessionInput = Pick<AuthUser, 'id'>;

@Injectable()
export class IssueAuthSessionStep {
  public async execute(input: IssueAuthSessionInput) {
    return {
      accessToken: `mock-access-token${input.id}`,
      refreshToken: 'mock-refresh-token',
    };
  }
}
