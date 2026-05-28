import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../config/routes';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'ppf-header',
  imports: [NgOptimizedImage, RouterLink, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly ROUTES = ROUTES;
}
