import { CoreError } from '$/core/errors/core.error';
import { InvalidCredentialsError } from '$/core/errors/invalid-credentials.error';
import { InvalidPlaylistTrackReferenceError } from '$/core/errors/invalid-playlist-track-reference.error';
import { LocalEmailAlreadyTakenError } from '$/core/errors/local-email-already-taken.error';
import { TrackProviderUnavailableError } from '$/core/errors/track-provider-unavailable.error';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpStatus,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(CoreError)
export class CoreErrorFilter extends BaseExceptionFilter implements ExceptionFilter<CoreError> {
  public override catch(error: CoreError, host: ArgumentsHost): void {
    if (error instanceof LocalEmailAlreadyTakenError) {
      super.catch(
        new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          code: error.code,
          message: error.message,
        }),
        host,
      );

      return;
    }

    if (error instanceof InvalidCredentialsError) {
      super.catch(
        new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          code: error.code,
          message: error.message,
        }),
        host,
      );

      return;
    }

    if (error instanceof InvalidPlaylistTrackReferenceError) {
      super.catch(
        new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          code: error.code,
          message: error.message,
        }),
        host,
      );

      return;
    }

    if (error instanceof TrackProviderUnavailableError) {
      super.catch(
        new ServiceUnavailableException({
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          code: error.code,
          message: error.message,
        }),
        host,
      );

      return;
    }

    super.catch(error, host);
  }
}
