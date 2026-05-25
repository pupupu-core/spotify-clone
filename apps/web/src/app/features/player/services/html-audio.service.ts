import { DestroyRef, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioEngine {
  private readonly audio = new Audio();

  public readonly isPlaying = signal(false);
  public readonly buffered = signal(0);

  constructor() {
    const currentAudio = this.audio;

    currentAudio.preload = 'metadata';

    const onPlay = (): void => this.isPlaying.set(true);
    const onPause = (): void => this.isPlaying.set(false);
    const onProgress = (): void => {
      if (this.buffered.length >= 1) {
        this.buffered.set(currentAudio.buffered.end(currentAudio.buffered.length - 1));
      }
    };

    currentAudio.addEventListener('play', onPlay);
    currentAudio.addEventListener('pause', onPause);
    currentAudio.addEventListener('progress', onProgress);

    inject(DestroyRef).onDestroy(() => {
      currentAudio.removeEventListener('play', onPlay);
      currentAudio.removeEventListener('pause', onPause);
      currentAudio.removeEventListener('progress', onProgress);
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
