import { DestroyRef, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioEngine {
  private readonly audio = new Audio();

  public readonly isPlaying = signal(false);

  constructor() {
    const currentAudio = this.audio;

    const onPlay = (): void => this.isPlaying.set(true);
    const onPause = (): void => this.isPlaying.set(false);

    currentAudio.addEventListener('play', onPlay);
    currentAudio.addEventListener('pause', onPause);

    inject(DestroyRef).onDestroy(() => {
      currentAudio.removeEventListener('play', onPlay);
      currentAudio.removeEventListener('pause', onPause);
    });
  }

  public load(src: string): void {
    this.audio.src = src;
  }

  public play(): void {
    void this.audio.play();
  }

  public pause(): void {
    this.audio.pause();
  }

  public toggle(): void {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }
}
