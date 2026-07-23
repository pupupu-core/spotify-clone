import type { Route } from '@angular/router';
import { ROUTES } from './core/config/routes.config';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const appRoutes: Route[] = [
  {
    path: ROUTES.AUTH.path,
    title: ROUTES.AUTH.meta.title,
    loadComponent: () =>
      import('./pages/layouts/auth/auth-layout.component').then(
        ({ AuthLayoutComponent }) => AuthLayoutComponent,
      ),
    canActivate: [guestGuard],
    children: [
      {
        path: ROUTES.AUTH.LOGIN.path,
        title: ROUTES.AUTH.LOGIN.meta.title,
        loadComponent: () =>
          import('./pages/login/login-page.component').then(
            ({ LoginPageComponent }) => LoginPageComponent,
          ),
      },
      {
        path: ROUTES.AUTH.REGISTER.path,
        title: ROUTES.AUTH.REGISTER.meta.title,
        loadComponent: () =>
          import('./pages/register/register-page.component').then(
            ({ RegisterPageComponent }) => RegisterPageComponent,
          ),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/layouts/app/app-layout.component').then(
        ({ AppLayoutComponent }) => AppLayoutComponent,
      ),
    canMatch: [authGuard],
    children: [
      {
        path: ROUTES.HOME.path,
        title: ROUTES.HOME.meta.title,
        loadComponent: () =>
          import('./pages/home/home-page.component').then(
            ({ HomePageComponent }) => HomePageComponent,
          ),
      },
      {
        path: ROUTES.SEARCH.path,
        title: ROUTES.SEARCH.meta.title,
        loadComponent: () =>
          import('./pages/search-page/search-page.component').then(
            ({ PpfSearchPageComponent }) => PpfSearchPageComponent,
          ),
      },
      {
        path: ROUTES.ARTIST.path,
        title: ROUTES.ARTIST.meta.title,
        loadComponent: () =>
          import('./pages/artist/artist-page.component').then(
            ({ ArtistPageComponent }) => ArtistPageComponent,
          ),
      },
      {
        path: ROUTES.ARTIST_ALBUM.path,
        title: ROUTES.ARTIST_ALBUM.meta.title,
        loadComponent: () =>
          import('~/pages/artist-album/artist-album-page.component').then(
            ({ ArtistAlbumPageComponent }) => ArtistAlbumPageComponent,
          ),
      },
      {
        path: ROUTES.LIBRARY.path,
        title: ROUTES.LIBRARY.meta.title,
        loadComponent: () =>
          import('~/pages/library/library-page.component').then(
            ({ LibraryPageComponent }) => LibraryPageComponent,
          ),
      },
      {
        path: ROUTES.ABOUT_US.path,
        title: ROUTES.ABOUT_US.meta.title,
        loadComponent: () =>
          import('~/pages/about-us/about-us-page.component').then(
            ({ AboutUsPageComponent }) => AboutUsPageComponent,
          ),
      },
      {
        path: ROUTES.NOT_FOUND.path,
        title: ROUTES.NOT_FOUND.meta.title,
        loadComponent: () =>
          import('./pages/not-found/not-found-page.component').then(
            ({ NotFoundPageComponent }) => NotFoundPageComponent,
          ),
      },
    ],
  },
];
