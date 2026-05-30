import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSuffix } from '@angular/material/input';

@Component({
  selector: 'ppf-nav-control',
  imports: [MatIcon, MatSuffix, MatButton],
  templateUrl: './nav-control.component.html',
  styleUrl: './nav-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavControlComponent {
  protected readonly navControlClick = output<void>();
}
