import { Injectable } from '@nestjs/common';
import type { AuthTokenResponse, LoginRequest } from '@streaming-service/model';
import { FindUserForLoginStep } from '../../steps/find-user-for-login.step';
import { VerifyLoginPasswordStep } from '../../steps/verify-login-password.step';
import { IssueAuthSessionStep } from '../../steps/issue-auth-session.step';

type LoginInput = LoginRequest;

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserForLoginStep: FindUserForLoginStep,
    private readonly verifyLoginPasswordStep: VerifyLoginPasswordStep,
    private readonly issueAuthSessionStep: IssueAuthSessionStep,
  ) {}

  public async login(input: LoginInput): Promise<AuthTokenResponse> {
    const user = await this.findUserForLoginStep.execute(input);

    await this.verifyLoginPasswordStep.execute({
      plainPassword: input.password,
      passwordHash: user.password,
    });

    return await this.issueAuthSessionStep.execute({ id: user.id });
  }

  public logout(): { message: string } {
    return { message: 'Logged out successfully' };
  }

  public register(): AuthTokenResponse {
    // TODO
    // register workflow
    //   -> ensure-user-email-is-available
    //   -> hash-user-password
    //   -> create-user-account
    //   -> issue-auth-session
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }

  public refresh(): AuthTokenResponse {
    // TODO
    // refresh workflow
    //   -> validate-refresh-token
    //   -> issue-auth-session
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }

  public me(): AuthTokenResponse {
    // TODO
    // me workflow
    //   -> retrieve-current-auth-user
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }
}
