import { API_ERROR_CODES } from '@streaming-service/config';
import { CoreError } from './core.error';

export class AccountNotFoundError extends CoreError {
  public constructor() {
    super({ message: 'Account not found', code: API_ERROR_CODES.ACCOUNT.NOT_FOUND });
  }
}
