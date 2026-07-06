import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import type { LoginRequest } from '@streaming-service/model';
import { SubmitButtonTextPipe } from '~/shared/pipes/submit-button-text.pipe';

@Component({
  selector: 'ppf-login-form',
  imports: [
    ReactiveFormsModule,
    SubmitButtonTextPipe,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatIcon,
    MatIconButton,
    MatSuffix,
    RouterLink,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  public readonly isLoading = input.required<boolean>();
  public readonly error = input.required<string | null>();
  public readonly showSupportHint = input(false);
  public readonly supportLink = input<string | null>(null);
  public readonly formSubmit = output<LoginRequest>();

  protected readonly isPasswordVisible = signal(false);
  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  protected togglePasswordVisibility(): void {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }

  protected submit(): void {
    if (this.isLoading()) {
      return;
    }

    if (this.form.invalid) {
      return;
    }

    this.formSubmit.emit(this.form.getRawValue());
  }
}
