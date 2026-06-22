import { Injectable } from '@nestjs/common';
import { IssueAuthSessionStep } from '$/core/steps/issue-auth-session.step';
import { FindActiveAuthSessionStep } from '$/core/steps/find-active-auth-session.step';
import { RevokeAuthSessionStep } from '$/core/steps/revoke-auth-session.step';
import { AuthTokenService } from '$/infrastructure/token/auth-token.service';
import { AuthTokenPair } from '$/core/models/auth/auth-session.model';
import { InvalidCredentialsError } from '$/core/errors/invalid-credentials.error';

@Injectable()
export class RefreshUserSessionWorkflow {
  public constructor(
    private readonly issueAuthSessionStep: IssueAuthSessionStep,
    private readonly findActiveAuthSessionStep: FindActiveAuthSessionStep,
    private readonly revokeAuthSessionStep: RevokeAuthSessionStep,
    private readonly authTokenService: AuthTokenService,
  ) {}

  public async execute(refreshToken?: string): Promise<AuthTokenPair> {
    if (!refreshToken) {
      throw new InvalidCredentialsError();
    }

    const refreshTokenHash = this.authTokenService.hashRefreshToken(refreshToken);
    const { accountId } = await this.findActiveAuthSessionStep.execute({ refreshTokenHash });

    // TODO: Rotate refresh sessions atomically with a Prisma transaction
    // to avoid partial revocation.
    await this.revokeAuthSessionStep.execute({ refreshToken });

    return this.issueAuthSessionStep.execute({ accountId });
  }
}
