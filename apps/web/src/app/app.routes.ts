import type { Route } from '@angular/router';
import { ROUTES } from './core/config/routes.config';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { PpfSearchPageComponent } from './pages/search-page/search-page.component';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { ArtistPageComponent } from '~/pages/artist/artist-page.component';
import { AuthLayoutComponent } from './features/auth/layouts/auth-layout.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';

export const appRoutes: Route[] = [
  {
    path: ROUTES.AUTH.path,
    title: ROUTES.AUTH.meta.title,
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: ROUTES.AUTH.LOGIN.path,
        title: ROUTES.AUTH.LOGIN.meta.title,
        component: LoginPageComponent,
      },
      {
        path: ROUTES.AUTH.REGISTER.path,
        title: ROUTES.AUTH.REGISTER.meta.title,
        component: RegisterPageComponent,
      },
    ],
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
      {
        path: ROUTES.ARTIST.path,
        title: ROUTES.ARTIST.meta.title,
        component: ArtistPageComponent,
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
