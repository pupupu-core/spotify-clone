import { Injectable } from '@nestjs/common';
import { FindUserForLoginStep } from '../../steps/find-user-for-login.step';
import { VerifyLoginPasswordStep } from '../../steps/verify-login-password.step';
import { IssueAuthSessionStep } from '../../steps/issue-auth-session.step';
import { AuthSession } from '$/core/models/auth/auth-session.model';

export interface LoginUserCommand {
  email: string;
  password: string;
}

@Injectable()
export class LoginUserWorkflow {
  constructor(
    private readonly findUserForLoginStep: FindUserForLoginStep,
    private readonly verifyLoginPasswordStep: VerifyLoginPasswordStep,
    private readonly issueAuthSessionStep: IssueAuthSessionStep,
  ) {}

  public async execute({ email, password }: LoginUserCommand): Promise<AuthSession> {
    const user = await this.findUserForLoginStep.execute({ email });

    await this.verifyLoginPasswordStep.execute({
      plainPassword: password,
      passwordHash: user.password,
    });

    return await this.issueAuthSessionStep.execute({ id: user.id });
  }
}
