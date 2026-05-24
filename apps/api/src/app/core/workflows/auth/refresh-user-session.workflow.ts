import { IssueAuthSessionStep } from '$/core/steps/issue-auth-session.step';
import { Injectable } from '@nestjs/common';
import type { AuthTokenResponse } from '@streaming-service/model';

@Injectable()
export class RefreshUserSessionWorkflow {
  public constructor(private readonly issueAuthSessionStep: IssueAuthSessionStep) {}

  public async execute(input): Promise<AuthTokenResponse> {
    // TODO
    // refresh workflow
    //   -> validate-refresh-token
    return this.issueAuthSessionStep.execute(input);
    //   -x issue-auth-session
  }
}
