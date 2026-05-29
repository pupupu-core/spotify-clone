import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../config/routes';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';

@Component({
  selector: 'ppf-header',
  imports: [NgOptimizedImage, RouterLink, SearchBarComponent, NavComponent, AuthButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly ROUTES = ROUTES;

  protected logoutUser(): void {
    // TODO: добавить логику после появления стора
    console.log('я разлогинился');
  }
}
