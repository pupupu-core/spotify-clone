import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { AUTH_CONSTRAINTS } from '@streaming-service/config';
import type { RegisterRequest } from '@streaming-service/model';
import { SubmitButtonTextPipe } from '~/shared/pipes/submit-button-text.pipe';

@Component({
  selector: 'ppf-register-form',
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
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  public readonly isLoading = input.required<boolean>();
  public readonly error = input.required<string | null>();
  public readonly formSubmit = output<RegisterRequest>();

  protected readonly authConstraints = AUTH_CONSTRAINTS;
  protected readonly isPasswordVisible = signal(false);
  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(AUTH_CONSTRAINTS.password.minLength),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/),
      ],
    ],
    username: [''],
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
