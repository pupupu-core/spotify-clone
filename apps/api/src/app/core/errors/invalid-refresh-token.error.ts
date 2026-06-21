import { API_ERROR_CODES } from '@streaming-service/config';
import { CoreError } from './core.error';

export class InvalidRefreshTokenError extends CoreError {
  public constructor() {
    super({
      message: 'Invalid refresh token',
      code: API_ERROR_CODES.AUTH.INVALID_CREDENTIALS,
    });
  }
}
