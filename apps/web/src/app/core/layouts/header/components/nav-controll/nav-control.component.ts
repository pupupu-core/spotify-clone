import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ppf-nav-control',
  imports: [MatIcon, MatButton],
  templateUrl: './nav-control.component.html',
  styleUrl: './nav-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavControlComponent {
  protected readonly navControlClick = output<void>();
}
