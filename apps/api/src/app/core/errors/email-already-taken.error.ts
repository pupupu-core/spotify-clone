import { CoreError } from './core.error';

export class EmailAlreadyTakenError extends CoreError {
  public constructor() {
    super({ message: 'Email already taken', code: 'AUTH_EMAIL_TAKEN' });
  }
}
