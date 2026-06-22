import { Injectable } from '@nestjs/common';
import { RevokeAuthSessionStep } from '$/core/steps/revoke-auth-session.step';

interface LogoutUserCommand {
  refreshToken?: string;
}

@Injectable()
export class LogoutUserWorkflow {
  constructor(private readonly revokeAuthSessionStep: RevokeAuthSessionStep) {}

  public async execute({ refreshToken }: LogoutUserCommand): Promise<void> {
    if (!refreshToken) {
      return;
    }

    return await this.revokeAuthSessionStep.execute({ refreshToken });
  }
}
