import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ROUTES } from '../../../../config/routes.config';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { APP_NAME } from '../../../../constants/common.constants';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { APP_ROUTES } from '~/core/tokens/app-routes.token';
import { AuthSessionService } from '~/core/stores/auth-session.service';

const NAV_ITEMS: NavItem[] = [
  { label: ROUTES.HOME.meta.title, path: ROUTES.HOME.to, backgroundImage: '/' },
  { label: ROUTES.SEARCH.meta.title, path: ROUTES.SEARCH.to, backgroundImage: '/search' },
  { label: ROUTES.LIBRARY.meta.title, path: ROUTES.LIBRARY.to, backgroundImage: '/library' },
  { label: ROUTES.ABOUT_US.meta.title, path: ROUTES.ABOUT_US.to, backgroundImage: '/about-us' },
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
    MatIcon,
    MatIconButton,
    MatDialogClose,
    LogoutButtonComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  private readonly authSession = inject(AuthSessionService);
  private readonly router = inject(Router);
  private readonly routes = inject(APP_ROUTES);

  public readonly logoutClick = output<void>();
  protected readonly hoveredRouter = signal<string>(this.router.url);
  protected readonly navItems = NAV_ITEMS;
  protected readonly APP_NAME = APP_NAME;

  protected logout(): void {
    this.authSession.logout().subscribe(() => {
      this.logoutClick.emit();
      void this.router.navigateByUrl(this.routes.AUTH.LOGIN.to);
    });
  }
}
