import type { AfterViewInit, ElementRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { downsampleWaveformPeaks, parseWaveformPeaks } from './waveform';

const WAVEFORM_BAR_GAP = 2;
const WAVEFORM_MIN_BAR_WIDTH = 2;
const FALLBACK_TRACK_HEIGHT = 2;

@Component({
  selector: 'ppf-waveform-seek',
  templateUrl: './waveform-seek.component.html',
  styleUrl: './waveform-seek.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfWaveformSeekComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private animFrameId?: number;
  private resizeObserver?: ResizeObserver;
  private activePointerId: number | null = null;
  private keyboardSeeking = false;

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  public readonly waveformData = input<string | null>();
  public readonly position = input.required<number>();
  public readonly duration = input.required<number>();

  public readonly seekStart = output<void>();
  public readonly seekPreview = output<number>();
  public readonly seekChange = output<number>();

  protected readonly isDragging = signal<boolean>(false);
  protected readonly dragPosition = signal<number>(0);

  protected readonly peaks = computed(() => parseWaveformPeaks(this.waveformData()));

  constructor() {
    effect(() => {
      this.peaks();
      this.position();
      this.duration();
      this.isDragging();
      this.dragPosition();

      this.scheduleDraw();
    });

    this.destroyRef.onDestroy(() => {
      if (typeof this.animFrameId === 'number') {
        cancelAnimationFrame(this.animFrameId);
      }

      this.resizeObserver?.disconnect();
    });
  }

  public ngAfterViewInit(): void {
    const canvasEl = this.canvas()?.nativeElement;

    if (!canvasEl) {
      return;
    }

    this.resizeCanvas();
    this.draw();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
      this.scheduleDraw();
    });
    this.resizeObserver.observe(canvasEl);
  }

  protected onPointerDown(event: PointerEvent, input: HTMLInputElement): void {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    this.activePointerId = event.pointerId;
    input.setPointerCapture(event.pointerId);
    this.beginSeek(input.valueAsNumber);
  }

  protected onInput(seconds: number): void {
    const nextPosition = this.clampPosition(seconds);

    if (this.activePointerId === null && !this.keyboardSeeking) {
      this.keyboardSeeking = true;
      this.beginSeek(nextPosition);
    }

    this.dragPosition.set(nextPosition);
    this.seekPreview.emit(nextPosition);
  }

  protected onPointerUp(event: PointerEvent, seconds: number): void {
    if (event.pointerId !== this.activePointerId) {
      return;
    }

    this.activePointerId = null;
    this.completeSeek(seconds);
  }

  protected onPointerCancel(event: PointerEvent): void {
    if (event.pointerId !== this.activePointerId) {
      return;
    }

    this.activePointerId = null;
    this.completeSeek(this.dragPosition());
  }

  protected onKeyUp(seconds: number): void {
    if (!this.keyboardSeeking) {
      return;
    }

    this.keyboardSeeking = false;
    this.completeSeek(seconds);
  }

  protected onChange(seconds: number): void {
    if (this.activePointerId !== null || !this.isDragging()) {
      return;
    }

    this.keyboardSeeking = false;
    this.completeSeek(seconds);
  }

  protected onBlur(seconds: number): void {
    if (!this.keyboardSeeking) {
      return;
    }

    this.keyboardSeeking = false;
    this.completeSeek(seconds);
  }

  private beginSeek(seconds: number): void {
    if (this.isDragging()) {
      return;
    }

    const nextPosition = this.clampPosition(seconds);

    this.dragPosition.set(nextPosition);
    this.isDragging.set(true);
    this.seekStart.emit();
    this.seekPreview.emit(nextPosition);
  }

  private completeSeek(seconds: number): void {
    if (!this.isDragging()) {
      return;
    }

    const nextPosition = this.clampPosition(seconds);

    this.dragPosition.set(nextPosition);
    this.isDragging.set(false);
    this.seekChange.emit(nextPosition);
  }

  private scheduleDraw(): void {
    if (typeof this.animFrameId === 'number') {
      cancelAnimationFrame(this.animFrameId);
    }

    this.animFrameId = requestAnimationFrame(() => {
      this.animFrameId = undefined;
      this.draw();
    });
  }

  private resizeCanvas(): void {
    const canvas = this.canvas()?.nativeElement;

    if (!canvas) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.round(canvas.clientWidth * ratio);
    canvas.height = Math.round(canvas.clientHeight * ratio);
    canvas.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  private draw(): void {
    const canvas = this.canvas()?.nativeElement;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) {
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const shownPosition = this.isDragging() ? this.dragPosition() : this.position();
    const playedX = this.duration() > 0 ? (shownPosition / this.duration()) * width : 0;
    const clampedPlayedX = Math.min(width, Math.max(0, playedX));
    const peaks = this.peaks();

    if (!peaks.length) {
      this.drawFallback(ctx, width, height, clampedPlayedX);

      return;
    }

    const maximumBars = Math.max(
      1,
      Math.floor(width / (WAVEFORM_MIN_BAR_WIDTH + WAVEFORM_BAR_GAP)),
    );
    const visiblePeaks = downsampleWaveformPeaks(peaks, maximumBars);
    const barWidth = width / visiblePeaks.length;

    for (let i = 0; i < visiblePeaks.length; i++) {
      const x = i * barWidth;
      const h = (visiblePeaks[i] / 100) * height;
      const y = (height - h) / 2;
      const drawWidth = Math.max(1, barWidth - WAVEFORM_BAR_GAP);

      ctx.fillStyle = x + drawWidth <= clampedPlayedX ? '#fff' : '#777';
      ctx.beginPath();
      ctx.roundRect(x, y, drawWidth, h, drawWidth / 2);
      ctx.fill();
    }
  }

  private clampPosition(seconds: number): number {
    if (!Number.isFinite(seconds)) {
      return 0;
    }

    return Math.min(Math.max(0, this.duration()), Math.max(0, seconds));
  }

  private drawFallback(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    playedX: number,
  ): void {
    const y = (height - FALLBACK_TRACK_HEIGHT) / 2;

    ctx.fillStyle = '#777';
    ctx.fillRect(0, y, width, FALLBACK_TRACK_HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, y, playedX, FALLBACK_TRACK_HEIGHT);
  }
}
