import { HttpErrorResponse } from '@angular/common/http';
import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { PpfToasterService } from '../services/ppf-toaster.service';

interface ErrorBody {
  readonly message: unknown;
}

const HTTP_ERROR_HEADER = 'Oops!';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const toaster = inject(PpfToasterService);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        toaster.error(HTTP_ERROR_HEADER, getHttpErrorMessage(error));
      }

      return throwError(() => error);
    }),
  );
};

const getHttpErrorMessage = (error: HttpErrorResponse): string => {
  const responseBody: unknown = error.error;
  const source = hasMessage(responseBody) ? responseBody.message : responseBody;

  if (typeof source !== 'string') {
    return error.message;
  }

  return normalizeSingleMessage(source) ?? error.message;
};

const hasMessage = (value: unknown): value is ErrorBody =>
  typeof value === 'object' && value !== null && 'message' in value;

const normalizeSingleMessage = (message: string): string | null => {
  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return null;
  }

  return trimmedMessage;
};
