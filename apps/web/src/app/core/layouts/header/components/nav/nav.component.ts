import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTES } from '../../../../config/routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

const NAV_ITEMS = [
  { label: ROUTES.HOME.meta.title, path: ROUTES.HOME.to },
  { label: ROUTES.SEARCH.meta.title, path: ROUTES.SEARCH.to },
  { label: ROUTES.LIBRARY.meta.title, path: ROUTES.LIBRARY.to },
  { label: ROUTES.ABOUT_US.meta.title, path: ROUTES.ABOUT_US.to },
];

@Component({
  selector: 'ppf-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  protected readonly navItems = NAV_ITEMS;
}
