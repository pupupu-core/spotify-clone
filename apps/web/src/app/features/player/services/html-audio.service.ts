import { inject, Injectable, NgZone, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PpfAudioEngine {
  private readonly audio = new Audio();
  private readonly ngZone = inject(NgZone);

  public readonly isPlaying = signal(false);
  public readonly buffered = signal(0);

  public readonly position = signal(0);
  public readonly duration = signal(0);

  public readonly volume = signal(100);

  public readonly ended = signal(0);

  public readonly isMuted = signal(false);

  private wasPlayingBeforeSeek = false;

  public readonly isSeeking = signal<boolean>(false);

  constructor() {
    this.preloadMetadata();
    this.constructEvents();

    this.audio.addEventListener('seeking', () => {
      this.isSeeking.set(true);
    });

    this.audio.addEventListener('seeked', () => {
      this.isSeeking.set(false);
    });
  }

  public load(src: string): void {
    this.audio.src = src;
    this.position.set(0);
    this.duration.set(0);
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

  public seek(seconds: number): void {
    this.audio.currentTime = seconds;
  }

  public setVolume(value: number): void {
    const clamped = Math.min(100, Math.max(0, value));

    this.audio.volume = Math.round(clamped) / 100;
    this.volume.set(clamped);

    if (clamped > 0 && this.audio.muted) {
      this.audio.muted = false;
      this.isMuted.set(false);
    }
  }

  public onEnded(handler: () => void) {
    this.audio.addEventListener('ended', handler);

    return (): void => this.audio.removeEventListener('ended', handler);
  }

  public clearAudioElement(): void {
    this.audio.pause();
    this.audio.removeAttribute('src');
    this.audio.load();
    this.isPlaying.set(false);
    this.buffered.set(0);
    this.position.set(0);
    this.duration.set(0);
  }

  public toggleMute(): void {
    const muted = !this.audio.muted;

    this.audio.muted = muted;
    this.isMuted.set(muted);
  }

  public startSeeking(): void {
    this.wasPlayingBeforeSeek = !this.audio.paused;

    if (this.wasPlayingBeforeSeek) {
      this.audio.pause();
    }
  }

  public finishSeeking(seconds: number): void {
    if (Number.isFinite(seconds)) {
      this.audio.currentTime = seconds;
    }
  }

  private preloadMetadata(): void {
    this.audio.preload = 'metadata';
  }

  private constructEvents(): void {
    this.ngZone.runOutsideAngular(() => {
      this.audio.addEventListener('play', () => this.isPlaying.set(true));
      this.audio.addEventListener('pause', () => this.isPlaying.set(false));
      this.audio.addEventListener('progress', () => this.onProgress());
      this.audio.addEventListener('loadedmetadata', () =>
        this.duration.set(this.audio.duration || 0),
      );
      this.audio.addEventListener('ended', () => this.isPlaying.set(false));
      this.audio.addEventListener('timeupdate', () => this.position.set(this.audio.currentTime));
    });
  }

  private onProgress(): void {
    const buffered = this.audio.buffered;

    if (buffered.length > 0) {
      this.buffered.set(buffered.end(buffered.length - 1));
    }
  }
}
