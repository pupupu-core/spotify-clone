import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ROUTES } from '../../config/routes.config';
import { SearchBarComponent } from '~/features/search-bar/search-bar.component';
import { NavControlComponent } from './components/nav-controll/nav-control.component';
import { MatDialog } from '@angular/material/dialog';
import { NavComponent } from './components/nav/nav.component';
import { APP_NAME } from '../../constants/common.constants';
import { distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ppf-header',
  imports: [NgOptimizedImage, RouterLink, SearchBarComponent, NavControlComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly ROUTES = ROUTES;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly dialog = inject(MatDialog);
  protected readonly searchQuery = signal('');

  public constructor() {
    this.route.queryParamMap
      .pipe(
        map(params => params.get('q') ?? ''),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(query => {
        this.searchQuery.set(query);
      });
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NavComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      position: {
        right: '0',
        top: '0',
      },
      width: 'min(50vw, 1000px)',
      maxWidth: 'none',
      minWidth: 'initial',
      minHeight: '100vh',
      panelClass: 'app-navigation-dialog',
      backdropClass: 'app-navigation-backdrop',
    });

    dialogRef.componentInstance.logoutClick.subscribe(() => {
      this.closeDialog();
    });
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

  protected search(query: string): void {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length === 0) {
      return;
    }

    void this.router.navigate([ROUTES.SEARCH.to], {
      queryParams: { q: normalizedQuery },
      queryParamsHandling: 'merge',
    });
  }

  protected readonly APP_NAME = APP_NAME;
}
