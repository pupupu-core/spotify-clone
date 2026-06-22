import { InjectionToken } from '@angular/core';
import { ROUTES } from '../config/routes.config';

export const APP_ROUTES = new InjectionToken<typeof ROUTES>('APP_ROUTES', {
  providedIn: 'root',
  factory: (): typeof ROUTES => ROUTES,
});
