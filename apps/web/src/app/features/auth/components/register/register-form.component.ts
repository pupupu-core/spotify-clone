import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { RegisterRequest } from '@streaming-service/model';

@Component({
  selector: 'ppf-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  public readonly isLoading = input.required<boolean>();
  public readonly error = input.required<string | null>();

  public readonly formSubmit = output<RegisterRequest>();

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    username: ['', [Validators.required]],
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
