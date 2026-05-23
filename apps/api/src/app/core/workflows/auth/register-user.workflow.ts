import { Injectable } from '@nestjs/common';
import type { AuthTokenResponse } from '@streaming-service/model';
import { IssueAuthSessionStep } from '../../steps/issue-auth-session.step';

@Injectable()
export class RegisterWorkflow {
  constructor(private readonly issueAuthSessionStep: IssueAuthSessionStep) {}
  public async execute(input): Promise<AuthTokenResponse> {
    // TODO
    // register workflow
    //   -> ensure-user-email-is-available
    //   -> hash-user-password
    //   -> create-user-account
    return await this.issueAuthSessionStep.execute(input);
    //   -> issue-auth-session
  }
}
