import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

import type { ToastPayload } from './models/toaster.model';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ppf-toaster-component',
  imports: [MatSnackBarAction, MatSnackBarLabel, MatButton, MatIcon],
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
