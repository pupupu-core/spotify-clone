import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '~/core/api/auth/auth.service';

@Component({
  selector: 'ppf-auth-page',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authApi = inject(AuthService);

  protected readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }
    this.login();
  }

  private login(): void {
    this.authApi.login(this.loginForm.getRawValue()).subscribe(({ accessToken }) => {
      this.loginForm.markAsPristine();
      console.log(accessToken);
    });
  }
}
