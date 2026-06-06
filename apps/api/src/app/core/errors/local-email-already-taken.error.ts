import { API_ERROR_CODES } from '@streaming-service/config';
import { CoreError } from './core.error';

export class LocalEmailAlreadyTakenError extends CoreError {
  public constructor() {
    super({
      message: 'Email already taken',
      code: API_ERROR_CODES.AUTH.LOCAL_EMAIL_ALREADY_TAKEN,
    });
  }
}
