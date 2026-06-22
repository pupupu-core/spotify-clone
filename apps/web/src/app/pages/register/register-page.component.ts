import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import type { RegisterRequest } from '@streaming-service/model';
import { finalize } from 'rxjs';
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

  protected readonly routes = ROUTES;
  protected readonly isFormLoading = signal(false);
  protected readonly formError = signal<string | null>(null);

  protected register(request: RegisterRequest): void {
    this.isFormLoading.set(true);
    this.formError.set(null);
    this.authSession
      .register(request)
      .pipe(finalize(() => this.isFormLoading.set(false)))
      .subscribe({
        next: () => this.router.navigateByUrl(ROUTES.HOME.to),
        error: (error: unknown) =>
          this.formError.set(
            error instanceof HttpErrorResponse ? error.error.message : String(error),
          ),
      });
  }
}
