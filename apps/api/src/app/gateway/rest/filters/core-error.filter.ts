import { CoreError } from '$/core/errors/core.error';
import { EmailAlreadyTakenError } from '$/core/errors/email-already-taken.error';
import { InvalidCredentialsError } from '$/core/errors/invalid-credentials.error';
import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(CoreError)
export class CoreErrorFilter extends BaseExceptionFilter implements ExceptionFilter<CoreError> {
  public override catch(error: CoreError, host: ArgumentsHost): void {
    if (error instanceof EmailAlreadyTakenError) {
      super.catch(new ConflictException(error.message), host);

      return;
    }

    if (error instanceof InvalidCredentialsError) {
      super.catch(new UnauthorizedException(error.message), host);

      return;
    }

    super.catch(error, host);
  }
}
