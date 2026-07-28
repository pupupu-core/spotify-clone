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
import { parseWaveformPeaks } from './waveform';

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

  public readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  public readonly waveformData = input<string | null>();
  public readonly position = input.required<number>();
  public readonly duration = input.required<number>();

  public readonly seekStart = output<void>();
  public readonly seekChange = output<number>();

  protected readonly isDragging = signal<boolean>(false);
  protected readonly dragPosition = signal<number>(0);

  protected readonly peaks = computed(() => parseWaveformPeaks(this.waveformData()));

  constructor() {
    effect(() => {
      this.peaks();
      this.position();
      this.duration();

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

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
      this.scheduleDraw();
    });
    this.resizeObserver.observe(canvasEl);
  }

  protected onSeekStart(): void {
    if (!this.isDragging()) {
      this.isDragging.set(true);
      this.seekStart.emit();
    }
  }

  protected onInput(seconds: number): void {
    if (!this.isDragging()) {
      this.onSeekStart();
    }
    this.dragPosition.set(seconds);
  }

  protected onChange(seconds: number): void {
    this.isDragging.set(false);
    this.seekChange.emit(seconds);
  }

  protected seekTo(seconds: number): void {
    this.seekChange.emit(seconds);
  }

  private scheduleDraw(): void {
    if (typeof this.animFrameId === 'number') {
      cancelAnimationFrame(this.animFrameId);
    }

    this.animFrameId = requestAnimationFrame(() => this.draw());
  }

  private resizeCanvas(): void {
    const canvas = this.canvas()?.nativeElement;

    if (!canvas) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;

    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
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

    const peaks = this.peaks();

    if (!peaks.length) {
      return;
    }

    const playedX = this.duration() > 0 ? (this.position() / this.duration()) * width : 0;
    const gap = 2;
    const barWidth = width / peaks.length;

    for (let i = 0; i < peaks.length; i++) {
      const x = i * barWidth;
      const h = (peaks[i] / 100) * height;
      const y = (height - h) / 2;
      const drawWidth = Math.max(1, barWidth - gap);

      ctx.fillStyle = x + drawWidth <= playedX ? '#fff' : '#777';
      ctx.beginPath();
      ctx.roundRect(x, y, drawWidth, h, drawWidth / 2);
      ctx.fill();
    }
  }
}
