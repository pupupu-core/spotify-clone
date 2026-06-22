import { Injectable } from '@nestjs/common';
import { CreateLocalAccountStep } from '$/core/steps/create-local-account.step';
import { EnsureLocalEmailIsAvailableStep } from '$/core/steps/ensure-local-email-is-available.step';
import { HashPasswordStep } from '$/core/steps/hash-password.step';
import { IssueAuthSessionStep } from '$/core/steps/issue-auth-session.step';
import { AuthTokenPair } from '$/core/models/auth/auth-session.model';

interface RegisterLocalUserCommand {
  email: string;
  password: string;
  username?: string;
}

@Injectable()
export class RegisterUserWorkflow {
  constructor(
    private readonly issueAuthSessionStep: IssueAuthSessionStep,
    private readonly ensureLocalEmailIsAvailableStep: EnsureLocalEmailIsAvailableStep,
    private readonly hashPasswordStep: HashPasswordStep,
    private readonly createLocalAccountStep: CreateLocalAccountStep,
  ) {}
  public async execute({ email, password }: RegisterLocalUserCommand): Promise<AuthTokenPair> {
    await this.ensureLocalEmailIsAvailableStep.execute({ email });

    const { passwordHash } = await this.hashPasswordStep.execute({ password });
    const { accountId } = await this.createLocalAccountStep.execute({
      email,
      passwordHash,
    });

    return await this.issueAuthSessionStep.execute({ accountId });
  }
}
