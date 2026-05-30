import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../config/routes';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavControlComponent } from './components/nav-controll/nav-control.component';
import { MatDialog } from '@angular/material/dialog';
import { NavComponent } from './components/nav/nav.component';

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
      panelClass: 'nav-dialog',
      backdropClass: 'nav-backdrop',
    });

    dialogRef.componentInstance.logoutClick.subscribe(logoutClick => {
      console.log('logoutClick', logoutClick);
    });
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }
}
