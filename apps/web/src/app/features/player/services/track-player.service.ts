import { computed, effect, inject, Injectable, signal } from '@angular/core';
import type { JamendoTrack } from '../../../core/api/jamendo/models/tracks.model';
import { PpfAudioEngine } from './html-audio.service';

@Injectable({ providedIn: 'root' })
export class PpfPlayerService {
  private readonly engine = inject(PpfAudioEngine);

  public readonly queue = signal<JamendoTrack[]>([]);
  public readonly index = signal<number | null>(null);
  public readonly position = this.engine.position;
  public readonly duration = this.engine.duration;

  public readonly current = computed<JamendoTrack | null>(() => {
    const i = this.index();

    if (i === null) {
      return null;
    }

    return this.queue()[i] ?? null;
  });

  public readonly isPlaying = this.engine.isPlaying;

  public readonly volume = this.engine.volume;

  constructor() {
    this.engine.onEnded(() => this.next());

    effect(() => {
      const track = this.current();

      if (track) {
        this.engine.load(track.audio);
        this.engine.play();
      }
    });
  }

  public playTracks(tracks: JamendoTrack[], startIndex = 0): void {
    if (tracks.length === 0) {
      return;
    }

    const nextIndex = Math.max(0, Math.min(startIndex, tracks.length - 1));

    this.queue.set(tracks);
    this.index.set(nextIndex);
  }

  public toggle(): void {
    if (this.current()) {
      this.engine.toggle();
    }
  }

  public next(): void {
    const que = this.queue();
    const idx = this.index();

    if (idx === null) {
      return;
    }

    if (que.length === 0) {
      return;
    }

    const nextIndex = idx + 1;

    if (nextIndex >= que.length) {
      this.engine.pause();
    } else {
      this.index.set(nextIndex);
    }
  }

  public previous(): void {
    const idx = this.index();

    if (idx === null || idx === 0) {
      this.engine.seek(0);

      return;
    }

    this.index.set(idx - 1);
  }

  public seek(seconds: number): void {
    this.engine.seek(seconds);
  }

  public setVolume(value: number): void {
    this.engine.setVolume(value);
  }
}
