import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../config/routes.config';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavControlComponent } from './components/nav-controll/nav-control.component';
import { MatDialog } from '@angular/material/dialog';
import { NavComponent } from './components/nav/nav.component';
import { APP_NAME } from '../../constants/common.constants';

@Component({
  selector: 'ppf-header',
  imports: [NgOptimizedImage, RouterLink, SearchBarComponent, NavControlComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly ROUTES = ROUTES;

  protected readonly dialog = inject(MatDialog);

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

  protected readonly APP_NAME = APP_NAME;
}
