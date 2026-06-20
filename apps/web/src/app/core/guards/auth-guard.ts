import { inject } from '@angular/core';
import type { CanMatchFn } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTES } from '../config/routes.config';
import { AuthSessionService } from '../auth/auth-session.service';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const isAuthenticated = inject(AuthSessionService).isAuthenticated;

  return !isAuthenticated() ? router.createUrlTree([ROUTES.AUTH.LOGIN.to]) : true;
};
