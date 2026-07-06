import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import type { LoginRequest } from '@streaming-service/model';
import { catchError, EMPTY, finalize } from 'rxjs';
import { AuthSessionService } from '~/core/stores/auth-session.service';
import { LoginFormComponent } from '~/features/auth/components/login/login-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APP_ROUTES } from '~/core/tokens/app-routes.token';
import { APP_CONFIG } from '~/core/config/app.config';

@Component({
  selector: 'ppf-login-page',
  imports: [LoginFormComponent, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly authSession = inject(AuthSessionService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly failedLoginCount = signal(0);
  protected readonly shouldShowSupport = computed(
    () => this.failedLoginCount() >= APP_CONFIG.AUTH.failedRetriesAllowed,
  );
  protected readonly routes = inject(APP_ROUTES);
  protected readonly isFormLoading = signal(false);
  protected readonly formError = signal<string | null>(null);

  protected login(request: LoginRequest): void {
    this.isFormLoading.set(true);
    this.formError.set(null);
    this.authSession
      .login(request)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: unknown) => {
          this.failedLoginCount.update(count => count + 1);
          this.formError.set(
            error instanceof HttpErrorResponse ? error.error.message : String(error),
          );

          return EMPTY;
        }),
        finalize(() => this.isFormLoading.set(false)),
      )
      .subscribe(() => {
        this.failedLoginCount.set(0);
        void this.router.navigateByUrl(this.routes.HOME.to);
      });
  }
}
