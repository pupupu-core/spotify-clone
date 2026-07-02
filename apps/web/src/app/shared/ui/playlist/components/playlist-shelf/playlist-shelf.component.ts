import type { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  NgZone,
  output,
  viewChild,
} from '@angular/core';
import type { AlbumUI } from '~/shared/models/album-ui.model';
import { PlaylistCardComponent } from '~/shared/ui/playlist/components/playlist-card/playlist-card.component';
import type { AlbumCardMode } from '~/shared/ui/playlist/models/playlist.model';

@Component({
  selector: 'ppf-playlist-shelf',
  imports: [PlaylistCardComponent],
  templateUrl: './playlist-shelf.component.html',
  styleUrl: './playlist-shelf.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistShelfComponent implements AfterViewInit, OnDestroy {
  public readonly title = input.required<string>();
  public readonly albumsList = input.required<AlbumUI[]>();
  public readonly mode = input.required<AlbumCardMode>();
  protected readonly playlistClick = output<string>();

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
