import type { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  NgZone,
  viewChild,
} from '@angular/core';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';

@Component({
  selector: 'ppf-playlist-shelf',
  imports: [PlaylistCardComponent],
  templateUrl: './playlist-shelf.component.html',
  styleUrl: './playlist-shelf.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistShelfComponent implements AfterViewInit, OnDestroy {
  public readonly title = input.required<string>();

  private readonly zone = inject(NgZone);

  private readonly shelfRef = viewChild.required<ElementRef<HTMLDivElement>>('playlistShelfInner');
  private wheelContainer!: HTMLDivElement;

  protected wheelHandler = (event: WheelEvent): void => {
    event.preventDefault();
    this.wheelContainer.scrollLeft += event.deltaY;
  };

  public ngAfterViewInit(): void {
    this.wheelContainer = this.shelfRef().nativeElement;

    this.zone.runOutsideAngular(() => {
      this.wheelContainer.addEventListener('wheel', this.wheelHandler, {
        passive: false,
      });
    });
  }

  public ngOnDestroy(): void {
    this.wheelContainer.removeEventListener('wheel', this.wheelHandler);
  }
}
