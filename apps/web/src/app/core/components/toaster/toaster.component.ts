import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

import type { ToastPayload } from './models/toaster.model';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ppf-toaster-component',
  imports: [MatSnackBarAction, MatSnackBarLabel, MatIcon, MatIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'toaster.component.html',
  styleUrl: 'toaster.component.scss',
})
export class PpfToasterComponent {
  private readonly ppfSnackBarRef = inject<MatSnackBarRef<PpfToasterComponent>>(MatSnackBarRef);

  protected readonly payload = inject<ToastPayload>(MAT_SNACK_BAR_DATA);

  protected dismiss(): void {
    this.ppfSnackBarRef.dismiss();
  }
}
