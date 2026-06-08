import { Injectable } from '@nestjs/common';
import { RevokeAuthSessionStep } from '../../steps/revoke-auth-session.step';

interface LogoutUserCommand {
  refreshToken: string;
}

@Injectable()
export class LogoutUserWorkflow {
  constructor(private readonly revokeAuthSessionStep: RevokeAuthSessionStep) {}

  public async execute(command: LogoutUserCommand): Promise<void> {
    return await this.revokeAuthSessionStep.execute(command);
  }
}
