import { API_ERROR_CODES } from '@streaming-service/config';
import { CoreError } from './core.error';

export class InvalidCredentialsError extends CoreError {
  public constructor() {
    super({ message: 'Invalid credentials', code: API_ERROR_CODES.AUTH.INVALID_CREDENTIALS });
  }
}
