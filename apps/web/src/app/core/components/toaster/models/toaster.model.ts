type ToastType = 'default' | 'info' | 'warn' | 'error' | 'success';

export interface ToastPayload {
  readonly type: ToastType;
  readonly header: string;
  readonly text: string;
}

export interface ToastOptions {
  readonly durationMs?: number;
}
