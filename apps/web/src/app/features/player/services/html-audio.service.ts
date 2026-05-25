import { DestroyRef, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PpfAudioEngine {
  private readonly audio = new Audio();

  public readonly isPlaying = signal(false);
  public readonly buffered = signal(0);

  public readonly position = signal(0);
  public readonly duration = signal(0);

  constructor() {
    const currentAudio = this.audio;

    currentAudio.preload = 'metadata';

    const onPlay = (): void => this.isPlaying.set(true);
    const onPause = (): void => this.isPlaying.set(false);
    const onTime = (): void => this.position.set(currentAudio.currentTime);
    const onDuration = (): void => this.duration.set(currentAudio.duration || 0);

    const onProgress = (): void => {
      if (currentAudio.buffered.length > 0) {
        this.buffered.set(currentAudio.buffered.end(currentAudio.buffered.length - 1));
      }
    };

    currentAudio.addEventListener('play', onPlay);
    currentAudio.addEventListener('pause', onPause);
    currentAudio.addEventListener('progress', onProgress);
    currentAudio.addEventListener('timeupdate', onTime);
    currentAudio.addEventListener('loadedmetadata', onDuration);

    inject(DestroyRef).onDestroy(() => {
      currentAudio.removeEventListener('play', onPlay);
      currentAudio.removeEventListener('pause', onPause);
      currentAudio.removeEventListener('progress', onProgress);
      currentAudio.removeEventListener('timeupdate', onTime);
      currentAudio.removeEventListener('loadedmetadata', onDuration);
    });
  }

  public load(src: string): void {
    this.audio.src = src;
  }

  public play(): void {
    void this.audio.play();
    // add popularity +1 here or in player service
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
