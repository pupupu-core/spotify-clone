import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import type { MatSnackBarRef } from '@angular/material/snack-bar';
import { PpfToasterComponent } from '../components/toaster/toaster.component';
import type {
  ToastOptions,
  ToastPayload,
  ToastType,
} from '../components/toaster/models/toaster.model';

const DEFAULT_DURATION_MS = 10_000;

@Injectable({ providedIn: 'root' })
export class PpfToasterService {
  private readonly snackBar = inject(MatSnackBar);

  public show(
    payload: ToastPayload,
    options: ToastOptions = {},
  ): MatSnackBarRef<PpfToasterComponent> {
    return this.snackBar.openFromComponent(PpfToasterComponent, {
      data: payload,
      duration: options.durationMs ?? DEFAULT_DURATION_MS,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  public default(
    header: string,
    text: string,
    options?: ToastOptions,
  ): MatSnackBarRef<PpfToasterComponent> {
    return this.open('default', header, text, options);
  }

  private open(
    type: ToastType,
    header: string,
    text: string,
    options?: ToastOptions,
  ): MatSnackBarRef<PpfToasterComponent> {
    return this.show({ type, header, text }, options);
  }
}
