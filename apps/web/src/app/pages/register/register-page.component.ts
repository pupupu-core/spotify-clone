import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import type { RegisterRequest } from '@streaming-service/model';
import { catchError, EMPTY, finalize } from 'rxjs';
import { AuthSessionService } from '~/core/auth/auth-session.service';
import { ROUTES } from '~/core/config/routes.config';
import { RegisterFormComponent } from '~/features/auth/components/register/register-form.component';

@Component({
  selector: 'ppf-register-page',
  imports: [RegisterFormComponent, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private readonly authSession = inject(AuthSessionService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly routes = ROUTES;
  protected readonly isFormLoading = signal(false);
  protected readonly formError = signal<string | null>(null);

  protected register(request: RegisterRequest): void {
    this.isFormLoading.set(true);
    this.formError.set(null);
    this.authSession
      .register(request)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: unknown) => {
          this.formError.set(
            error instanceof HttpErrorResponse ? error.error.message : String(error),
          );

          return EMPTY;
        }),
        finalize(() => this.isFormLoading.set(false)),
      )
      .subscribe(() => this.router.navigateByUrl(ROUTES.HOME.to));
  }
}
