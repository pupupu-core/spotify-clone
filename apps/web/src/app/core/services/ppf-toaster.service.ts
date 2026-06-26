import { inject, Injectable } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ppfToasterService {
  private readonly snackBar = inject(MatSnackBarModule);
  // openFromComponent + создать компонент
}
