import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ppf-artist-page',
  imports: [NgOptimizedImage, MatIcon],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPageComponent {}
