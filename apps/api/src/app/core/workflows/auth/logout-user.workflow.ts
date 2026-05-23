import { Injectable } from '@nestjs/common';
import { InvalidateUserSessionStep } from '../../steps/invalidate-user-session.step';

@Injectable()
export class LogoutUserWorkflow {
  constructor(private readonly invalidateUserSessionStep: InvalidateUserSessionStep) {}

  public async execute(input: string): Promise<void> {
    return await this.invalidateUserSessionStep.execute(input);
  }
}
