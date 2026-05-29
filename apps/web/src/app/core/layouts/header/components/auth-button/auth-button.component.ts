import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ppf-auth-button',
  imports: [MatIcon, MatButton],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthButtonComponent {
  protected readonly logoutClick = output<void>();
}
