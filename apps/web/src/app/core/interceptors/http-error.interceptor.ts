import { HttpErrorResponse } from '@angular/common/http';
import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { PpfToasterService } from '../services/ppf-toaster.service';

const HTTP_ERROR_HEADER = 'Oops!';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const toaster = inject(PpfToasterService);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        toaster.error(HTTP_ERROR_HEADER, error.message);
      }

      return throwError(() => error);
    }),
  );
};
