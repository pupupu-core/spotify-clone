import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormField, MatInput, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'ppf-search-bar',
  imports: [MatFormField, MatIcon, MatInput, MatSuffix, MatIconButton],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {}
