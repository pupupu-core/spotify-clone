import { inject } from '@angular/core';
import type { CanMatchFn } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTES } from '../../shared/config/routes';
import { IS_AUTHED } from '../config/mock-flags';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);

  return !IS_AUTHED ? router.createUrlTree([ROUTES.AUTH.to]) : true;
};
