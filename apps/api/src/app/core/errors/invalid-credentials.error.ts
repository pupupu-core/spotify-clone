import { CoreError } from './core.error';

export class InvalidCredentialsError extends CoreError {
  public constructor() {
    super({ message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' });
  }
}
