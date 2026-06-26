import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import type { ToastPayload } from './models/toaster.model';

@Component({
  selector: 'ppf-toaster',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'toaster.component.html',
  styleUrl: 'toaster.component.scss',
})
export class PpfToasterComponent {
  private readonly ppfSnackBarRef = inject<MatSnackBarRef<PpfToasterComponent>>(MatSnackBarRef);
  public readonly data = inject<ToastPayload>(MAT_SNACK_BAR_DATA);
  public readonly closeToast = output<void>();

  public readonly headerData = signal('hello').asReadonly();
  public readonly textData = signal('hello!').asReadonly();
}
