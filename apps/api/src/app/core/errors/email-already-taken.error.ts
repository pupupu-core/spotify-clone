import { API_ERROR_CODES } from '@streaming-service/config';
import { CoreError } from './core.error';

export class EmailAlreadyTakenError extends CoreError {
  public constructor() {
    super({ message: 'Email already taken', code: API_ERROR_CODES.AUTH.EMAIL_ALREADY_TAKEN });
  }
}
