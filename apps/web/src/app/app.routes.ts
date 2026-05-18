import type { Route } from '@angular/router';
import { ROUTES } from './shared/config/routes';
import { AppLayoutComponent as AppLayout } from './components/layout/app-layout/app-layout.component';
import { HomePageComponent as HomePage } from './pages/home/home-page.component';
import { AuthPageComponent as AuthPage } from './pages/auth/auth-page.component';
import { loadComponent } from './shared/lib/load-component';

const notFoundPage = loadComponent(() =>
  import('./pages/not-found/not-found-page.component').then(
    ({ NotFoundPageComponent }) => NotFoundPageComponent,
  ),
);

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: ROUTES.HOME.path,
        title: ROUTES.HOME.meta.title,
        component: HomePage,
      },
      {
        path: ROUTES.AUTH.path,
        title: ROUTES.AUTH.meta.title,
        component: AuthPage,
      },
      {
        path: '**',
        title: ROUTES.NOT_FOUND.meta.title,
        loadComponent: notFoundPage,
      },
    ],
  },
];
