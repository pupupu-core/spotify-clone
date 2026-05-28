import { Injectable } from '@nestjs/common';
import { IssueAuthSessionStep } from '../../steps/issue-auth-session.step';
import { EnsureUserEmailIsAvailableStep } from '$/core/steps/ensure-user-email-is-available.step';
import { HashUserPasswordStep } from '$/core/steps/hash-user-password.step';
import { CreateUserAccountStep } from '$/core/steps/create-user-account.step';
import { AuthSession } from '$/core/models/auth/auth-session.model';

interface RegisterUserWorkflowCommand {
  email: string;
  password: string;
  username?: string;
}

@Injectable()
export class RegisterUserWorkflow {
  constructor(
    private readonly issueAuthSessionStep: IssueAuthSessionStep,
    private readonly ensureUserEmailIsAvailableStep: EnsureUserEmailIsAvailableStep,
    private readonly hashUserPasswordStep: HashUserPasswordStep,
    private readonly createUserAccountStep: CreateUserAccountStep,
  ) {}
  public async execute({ email, password }: RegisterUserWorkflowCommand): Promise<AuthSession> {
    await this.ensureUserEmailIsAvailableStep.execute({ email });

    const { passwordHash } = await this.hashUserPasswordStep.execute({ password });
    const { id } = await this.createUserAccountStep.execute({
      email,
      passwordHash,
    });

    return await this.issueAuthSessionStep.execute({ id });
  }
}
