import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { LoginRequest } from '@streaming-service/model';
import { SubmitButtonTextPipe } from '~/shared/pipes/submit-button-text.pipe';

@Component({
  selector: 'ppf-login-form',
  imports: [ReactiveFormsModule, SubmitButtonTextPipe],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  public readonly isLoading = input.required<boolean>();
  public readonly error = input.required<string | null>();

  public readonly formSubmit = output<LoginRequest>();

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

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
