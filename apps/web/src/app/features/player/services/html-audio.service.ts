import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PpfAudioEngine {
  private readonly audio = new Audio();

  public readonly isPlaying = signal(false);
  public readonly buffered = signal(0);

  public readonly position = signal(0);
  public readonly duration = signal(0);

  public readonly volume = signal(100);

  public readonly ended = signal(0);

  constructor() {
    this.preloadMetadata();
    this.constructEvents();
  }

  private preloadMetadata(): void {
    this.audio.preload = 'metadata';
  }

  private constructEvents(): void {
    this.audio.addEventListener('play', () => this.isPlaying.set(true));
    this.audio.addEventListener('pause', () => this.isPlaying.set(false));
    this.audio.addEventListener('progress', () => this.onProgress());
    this.audio.addEventListener('loadedmetadata', () =>
      this.duration.set(this.audio.duration || 0),
    );
    this.audio.addEventListener('timeupdate', () => this.position.set(this.audio.currentTime));
    this.audio.addEventListener('ended', () => this.isPlaying.set(false));
  }

  private onProgress(): void {
    const buffered = this.audio.buffered;

    if (buffered.length > 0) {
      this.buffered.set(buffered.end(buffered.length - 1));
    }
  }

  public load(src: string): void {
    this.audio.src = src;
    this.position.set(0);
    this.duration.set(0);
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

  public seek(seconds: number): void {
    this.audio.currentTime = seconds;
  }

  public setVolume(value: number): void {
    const clamped = Math.min(100, Math.max(0, value));

    this.audio.volume = Math.round(clamped) / 100;
  }

  public onEnded(handler: () => void) {
    this.audio.addEventListener('ended', handler);

    return (): void => this.audio.removeEventListener('ended', handler);
  }
}
