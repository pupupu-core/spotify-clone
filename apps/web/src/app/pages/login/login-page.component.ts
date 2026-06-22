import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import type { LoginRequest } from '@streaming-service/model';
import { finalize } from 'rxjs';
import { AuthSessionService } from '~/core/auth/auth-session.service';
import { ROUTES } from '~/core/config/routes.config';
import { LoginFormComponent } from '~/features/auth/components/login/login-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  protected readonly routes = ROUTES;
  protected readonly isFormLoading = signal(false);
  protected readonly formError = signal<string | null>(null);

  protected login(request: LoginRequest): void {
    this.isFormLoading.set(true);
    this.formError.set(null);
    this.authSession
      .login(request)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isFormLoading.set(false)),
      )
      .subscribe({
        next: () => this.router.navigateByUrl(ROUTES.HOME.to),
        error: (error: unknown) =>
          this.formError.set(
            error instanceof HttpErrorResponse ? error.error.message : String(error),
          ),
      });
  }
}
