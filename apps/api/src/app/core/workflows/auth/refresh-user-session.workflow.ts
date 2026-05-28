import { IssueAuthSessionStep } from '$/core/steps/issue-auth-session.step';
import { Injectable } from '@nestjs/common';
import type { AuthTokenResponse } from '@streaming-service/model';

interface RefreshUserSessionCommand {
  id: string;
}

@Injectable()
export class RefreshUserSessionWorkflow {
  public constructor(private readonly issueAuthSessionStep: IssueAuthSessionStep) {}

  public async execute(command: RefreshUserSessionCommand): Promise<AuthTokenResponse> {
    // TODO
    // refresh workflow
    //   -> validate-refresh-token
    //   -> issue-auth-session
    return this.issueAuthSessionStep.execute(command);
  }
}
