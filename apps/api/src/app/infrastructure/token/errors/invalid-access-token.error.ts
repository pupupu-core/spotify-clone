import { API_ERROR_CODES } from '@streaming-service/config';
import { TokenError } from './token.error';

export class InvalidAccessTokenError extends TokenError {
  public constructor() {
    super({
      message: 'Invalid access token',
      code: API_ERROR_CODES.AUTH.INVALID_ACCESS_TOKEN,
    });
  }
}
