import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterFormComponent } from '~/features/auth/components/register/register-form.component';

@Component({
  selector: 'ppf-register-page',
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {}
