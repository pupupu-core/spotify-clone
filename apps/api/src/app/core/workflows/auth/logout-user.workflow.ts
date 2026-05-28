import { Injectable } from '@nestjs/common';
import { InvalidateUserSessionStep } from '../../steps/invalidate-user-session.step';

interface LogoutUserCommand {
  refreshToken: string;
}

@Injectable()
export class LogoutUserWorkflow {
  constructor(private readonly invalidateUserSessionStep: InvalidateUserSessionStep) {}

  public async execute(command: LogoutUserCommand): Promise<void> {
    return await this.invalidateUserSessionStep.execute(command);
  }
}
