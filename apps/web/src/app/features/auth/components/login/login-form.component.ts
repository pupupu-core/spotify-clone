import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { LoginRequest } from '@streaming-service/model';

@Component({
  selector: 'ppf-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  public readonly isLoading = input.required();
  public readonly error = input.required();

  public readonly loginSubmit = output<LoginRequest>();

  protected readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  protected submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginSubmit.emit(this.loginForm.getRawValue());
  }
}
