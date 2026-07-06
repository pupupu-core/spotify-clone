import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { catchError, EMPTY, finalize } from 'rxjs';
import { AuthSessionService } from '~/core/stores/auth-session.service';
import { APP_ROUTES } from '~/core/tokens/app-routes.token';

@Component({
  selector: 'ppf-auth-layout',
  imports: [RouterModule, MatButton],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  private readonly authSession = inject(AuthSessionService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly routes = inject(APP_ROUTES);

  protected readonly isDemoLoading = signal(false);

  protected loginDemo(): void {
    this.isDemoLoading.set(true);

    this.authSession
      .login({
        email: 'demo@pupufy.app',
        password: 'Demo123!',
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: unknown) => {
          console.error(error instanceof HttpErrorResponse ? error.error.message : error);

          return EMPTY;
        }),
        finalize(() => this.isDemoLoading.set(false)),
      )
      .subscribe(() => this.router.navigateByUrl(this.routes.HOME.to));
  }
}
