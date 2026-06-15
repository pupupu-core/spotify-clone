import { Injectable } from '@nestjs/common';
import type { AuthTokenResponse } from '@streaming-service/model';
import { IssueAuthSessionStep } from '$/core/steps/issue-auth-session.step';

@Injectable()
export class RefreshUserSessionWorkflow {
  public constructor(private readonly issueAuthSessionStep: IssueAuthSessionStep) {}

  public async execute(refreshToken: string): Promise<AuthTokenResponse> {
    // TODO
    // refresh workflow
    //   -> validate-refresh-token
    //   -> issue-auth-session
    return this.issueAuthSessionStep.execute({ accountId: refreshToken });
  }
}
