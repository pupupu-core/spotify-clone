import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import type { LoginRequest } from '@streaming-service/model';
import { finalize } from 'rxjs';
import { AuthSessionService } from '~/core/auth/auth-session.service';
import { ROUTES } from '~/core/config/routes.config';
import { LoginFormComponent } from '~/features/auth/components/login/login-form.component';

@Component({
  selector: 'ppf-login-page',
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly authSession = inject(AuthSessionService);
  private readonly router = inject(Router);

  protected readonly isFormLoading = signal(false);
  protected readonly loginFormError = signal<string | undefined>(undefined);

  protected login(request: LoginRequest): void {
    this.isFormLoading.set(true);
    this.loginFormError.set(undefined);
    this.authSession
      .login(request)
      .pipe(finalize(() => this.isFormLoading.set(false)))
      .subscribe({
        next: () => this.router.navigateByUrl(ROUTES.HOME.to),
        error: (error: unknown) =>
          this.loginFormError.set(
            error instanceof HttpErrorResponse ? error.error.message : String(error),
          ),
      });
  }
}
