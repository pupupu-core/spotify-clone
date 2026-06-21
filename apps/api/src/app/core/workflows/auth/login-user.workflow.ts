import { Injectable } from '@nestjs/common';
import { FindLocalIdentityForLoginStep } from '$/core/steps/find-local-identity-for-login.step';
import { IssueAuthSessionStep } from '$/core/steps/issue-auth-session.step';
import { VerifyLocalPasswordStep } from '$/core/steps/verify-local-password.step';
import { AuthTokenPair } from '$/core/models/auth/auth-session.model';

export interface LoginUserCommand {
  email: string;
  password: string;
}

@Injectable()
export class LoginUserWorkflow {
  constructor(
    private readonly findLocalIdentityForLoginStep: FindLocalIdentityForLoginStep,
    private readonly verifyLocalPasswordStep: VerifyLocalPasswordStep,
    private readonly issueAuthSessionStep: IssueAuthSessionStep,
  ) {}

  public async execute({ email, password }: LoginUserCommand): Promise<AuthTokenPair> {
    const authIdentity = await this.findLocalIdentityForLoginStep.execute({ email });

    await this.verifyLocalPasswordStep.execute({
      plainPassword: password,
      passwordHash: authIdentity.passwordHash,
    });

    return await this.issueAuthSessionStep.execute({ accountId: authIdentity.accountId });
  }
}
