import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTES } from '../config/routes';
import { IS_AUTHED } from '../config/mock-flags';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  return IS_AUTHED ? router.createUrlTree([ROUTES.HOME.to]) : true;
};
