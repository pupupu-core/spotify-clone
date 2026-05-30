import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ROUTES } from '../../../../config/routes';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { AuthButtonComponent } from '../auth-button/auth-button.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

const NAV_ITEMS: NavItem[] = [
  { label: ROUTES.HOME.meta.title, path: ROUTES.HOME.to, backgroundImage: 'home' },
  { label: ROUTES.SEARCH.meta.title, path: ROUTES.SEARCH.to, backgroundImage: 'search' },
  { label: ROUTES.LIBRARY.meta.title, path: ROUTES.LIBRARY.to, backgroundImage: 'library' },
  { label: ROUTES.ABOUT_US.meta.title, path: ROUTES.ABOUT_US.to, backgroundImage: 'about-us' },
];

interface NavItem {
  label: string;
  path: string;
  backgroundImage: string;
}

@Component({
  selector: 'ppf-nav',
  imports: [
    FormsModule,
    RouterLinkActive,
    RouterLink,
    MatDialogContent,
    AuthButtonComponent,
    MatIcon,
    MatIconButton,
    MatDialogClose,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  public readonly logoutClick = output<void>();
  protected readonly hoveredRouter = signal<NavItem>(NAV_ITEMS[0]);
  protected readonly navItems = NAV_ITEMS;
}
