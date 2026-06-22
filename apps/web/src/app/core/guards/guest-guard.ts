import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTES } from '../config/routes.config';
import { AuthSessionService } from '../stores/auth-session.service';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = inject(AuthSessionService).isAuthenticated;

  return isAuthenticated() ? router.createUrlTree([ROUTES.HOME.to]) : true;
};
