import type { Route } from '@angular/router';
import { ROUTES } from './core/config/routes';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { AuthPageComponent } from './pages/auth/auth-page.component';
import { PpfSearchPageComponent } from './pages/search-page/search-page.component';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const appRoutes: Route[] = [
  {
    path: ROUTES.AUTH.path,
    title: ROUTES.AUTH.meta.title,
    component: AuthPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: AppLayoutComponent,
    canMatch: [authGuard],
    children: [
      {
        path: ROUTES.HOME.path,
        title: ROUTES.HOME.meta.title,
        component: HomePageComponent,
      },
      {
        path: ROUTES.SEARCH.path,
        title: ROUTES.SEARCH.meta.title,
        component: PpfSearchPageComponent,
      },
    ],
  },
  {
    path: '**',
    title: ROUTES.NOT_FOUND.meta.title,
    loadComponent: () =>
      import('./pages/not-found/not-found-page.component').then(
        ({ NotFoundPageComponent }) => NotFoundPageComponent,
      ),
  },
];
