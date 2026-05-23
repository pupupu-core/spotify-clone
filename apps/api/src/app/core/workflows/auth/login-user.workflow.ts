import { Injectable } from '@nestjs/common';
import type { AuthTokenResponse, LoginRequest } from '@streaming-service/model';
import { FindUserForLoginStep } from '../../steps/find-user-for-login.step';
import { VerifyLoginPasswordStep } from '../../steps/verify-login-password.step';
import { IssueAuthSessionStep } from '../../steps/issue-auth-session.step';

type LoginInput = LoginRequest;

@Injectable()
export class LoginUserWorkflow {
  constructor(
    private readonly findUserForLoginStep: FindUserForLoginStep,
    private readonly verifyLoginPasswordStep: VerifyLoginPasswordStep,
    private readonly issueAuthSessionStep: IssueAuthSessionStep,
  ) {}

  public async execute(input: LoginInput): Promise<AuthTokenResponse> {
    const user = await this.findUserForLoginStep.execute(input);

    await this.verifyLoginPasswordStep.execute({
      plainPassword: input.password,
      passwordHash: user.password,
    });

    return await this.issueAuthSessionStep.execute({ id: user.id });
  }
}
