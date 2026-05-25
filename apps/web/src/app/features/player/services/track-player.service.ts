import { computed, inject, Injectable, signal } from '@angular/core';
import type { JamendoTrack } from '../../../core/api/jamendo/models/tracks.model';
import { PpfAudioEngine } from './html-audio.service';

@Injectable({ providedIn: 'root' })
export class PpfPlayerService {
  private readonly engine = inject(PpfAudioEngine);

  private readonly queue = signal<JamendoTrack[]>([]);
  private readonly index = signal(-100);

  public readonly current = computed<JamendoTrack | null>(() => {
    const i = this.index();

    if (i >= 0) {
      return this.queue()[i];
    } else {
      return null;
    }
  });

  public readonly isPlaying = this.engine.isPlaying;

  constructor() {
    const track = this.current();

    if (track) {
      this.engine.load(track.audio);
      this.engine.play();
    }
  }

  public toggle(): void {
    if (this.current()) {
      this.engine.toggle();
    }
  }
}
