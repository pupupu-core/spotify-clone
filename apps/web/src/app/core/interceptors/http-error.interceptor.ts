import { HttpErrorResponse } from '@angular/common/http';
import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { PpfToasterService } from '../services/ppf-toaster.service';

interface ErrorBody {
  readonly message: unknown;
}

const getErrorTitle = (error: HttpErrorResponse): string => {
  if (error.status === 0) {
    return 'Connection failed';
  }

  if (error.status === 401) {
    return 'You are not logged in!';
  }

  if (error.status >= 500) {
    return 'Server error';
  }

  return 'Request failed';
};

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const toaster = inject(PpfToasterService);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        toaster.error(getErrorTitle(error), getHttpErrorMessage(error));
      }

      return throwError(() => error);
    }),
  );
};

const getHttpErrorMessage = (error: HttpErrorResponse): string => {
  const responseBody: unknown = error.error;
  const source = hasMessage(responseBody) ? responseBody.message : responseBody;

  return normalizeMessage(source) ?? error.message;
};

const hasMessage = (value: unknown): value is ErrorBody =>
  typeof value === 'object' && value !== null && 'message' in value;

const normalizeMessage = (value: unknown): string | null => {
  if (typeof value === 'string') {
    return normalizeSingleMessage(value);
  }

  if (!Array.isArray(value)) {
    return null;
  }

  const normalizedMessages: string[] = [];

  for (const item of value) {
    if (typeof item !== 'string') {
      continue;
    }

    const normalizedMessage = normalizeSingleMessage(item);

    if (normalizedMessage !== null) {
      normalizedMessages.push(normalizedMessage);
    }
  }

  if (normalizedMessages.length === 0) {
    return null;
  }

  return normalizedMessages.join('. ');
};

const normalizeSingleMessage = (message: string): string | null => {
  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return null;
  }

  return trimmedMessage;
};
