import { computed, inject, Injectable, signal } from '@angular/core';
import type { TrackDataUI } from '../../../core/api/jamendo/models/common.model';
import { PpfAudioEngine } from './html-audio.service';

@Injectable({ providedIn: 'root' })
export class PpfPlayerService {
  private readonly engine = inject(PpfAudioEngine);

  public readonly queue = signal<TrackDataUI[]>([]);
  public readonly index = signal<number | null>(null);
  public readonly position = this.engine.position;
  public readonly duration = this.engine.duration;

  public readonly isMuted = this.engine.isMuted;

  public readonly current = computed<TrackDataUI | null>(() => {
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
  }

  public playTracks(tracks: TrackDataUI[], startIndex = 0): void {
    if (tracks.length === 0) {
      return;
    }

    const nextIndex = Math.max(0, Math.min(startIndex, tracks.length - 1));

    this.queue.set(tracks);

    this.playTrackAtIndex(nextIndex);
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
      this.playTrackAtIndex(nextIndex);
    }
  }

  public previous(): void {
    const idx = this.index();

    if (idx === null || idx === 0) {
      this.engine.seek(0);

      return;
    }

    this.playTrackAtIndex(idx - 1);
  }

  public seek(seconds: number): void {
    this.engine.seek(seconds);
  }

  public setVolume(value: number): void {
    this.engine.setVolume(value);
  }

  public removeTrackFromQueue(index: number): void {
    if (!this.isValidIndex(index)) {
      return;
    }

    const currentIndex = this.index();
    const nextQueue = this.removeTrackAtIndex(index);

    if (nextQueue.length === 0) {
      this.clearQueue();

      return;
    }

    const nextIndex = this.getIndexAfterRemoval(currentIndex, index, nextQueue.length);

    this.queue.set(nextQueue);

    if (nextIndex !== null) {
      this.playTrackAtIndex(nextIndex);
    }
  }

  public toggleMute(): void {
    this.engine.toggleMute();
  }

  public toggleTrackByID(track: TrackDataUI, tracks: TrackDataUI[]): void {
    if (this.current()?.id === track.id) {
      this.toggle();

      return;
    }

    const index = tracks.findIndex(item => item.id === track.id);

    if (index >= 0) {
      this.playTracks(tracks, index);
    }
  }

  public playQueuedTrack(index: number): void {
    if (!this.isValidIndex(index)) {
      return;
    }

    if (this.index() === index) {
      this.engine.play();

      return;
    }
    this.playTrackAtIndex(index);
  }

  private playTrackAtIndex(index: number): void {
    const track = this.queue()[index];

    this.index.set(index);
    this.engine.load(track.audio);
    this.engine.play();
  }

  private isValidIndex(index: number): boolean {
    return Number.isInteger(index) && index >= 0 && index < this.queue().length;
  }

  private clearQueue(): void {
    this.engine.clearAudioElement();
    this.queue.set([]);
    this.index.set(null);
  }

  private removeTrackAtIndex(index: number): TrackDataUI[] {
    return this.queue().filter((_, queueIndex) => queueIndex !== index);
  }

  private getIndexAfterRemoval(
    currentIndex: number | null,
    removedIndex: number,
    queueLength: number,
  ): number | null {
    if (currentIndex === null) {
      return null;
    }

    if (removedIndex < currentIndex) {
      return currentIndex - 1;
    }

    if (removedIndex === currentIndex) {
      return Math.min(currentIndex, queueLength - 1);
    }

    return currentIndex;
  }
}
