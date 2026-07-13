import { computed, inject, Injectable, signal } from '@angular/core';
import type { AuthTokenResponse, LoginRequest, RegisterRequest } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { catchError, finalize, of, shareReplay, tap, throwError } from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { APP_CONFIG } from '../config/app.config';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly authApi = inject(AuthApiService);
  private readonly accessToken = signal<string | null>(null);
  private readonly logoutPendingKey = APP_CONFIG.AUTH.logoutPendingKey;
  private readonly logoutPendingValue = APP_CONFIG.AUTH.logoutPendingValue;
  private refreshRequest$: Observable<AuthTokenResponse> | null = null;

  public readonly isAuthenticated = computed(() => this.accessToken() !== null);

  public getAccessToken(): string | null {
    return this.accessToken();
  }

  public get isLogoutPending(): boolean {
    return localStorage.getItem(this.logoutPendingKey) === this.logoutPendingValue;
  }

  public register(request: RegisterRequest): Observable<AuthTokenResponse> {
    return this.authApi
      .register(request)
      .pipe(tap(({ accessToken }) => this.accessToken.set(accessToken)));
  }

  public login(request: LoginRequest): Observable<AuthTokenResponse> {
    return this.authApi
      .login(request)
      .pipe(tap(({ accessToken }) => this.accessToken.set(accessToken)));
  }

  public refresh(): Observable<AuthTokenResponse> {
    if (this.refreshRequest$ !== null) {
      return this.refreshRequest$;
    }

    this.refreshRequest$ = this.authApi.refresh().pipe(
      tap({
        next: ({ accessToken }) => this.accessToken.set(accessToken),
        error: () => this.accessToken.set(null),
      }),
      finalize(() => {
        this.refreshRequest$ = null;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: false,
      }),
    );

    return this.refreshRequest$;
  }

  public logout(): Observable<void> {
    return this.authApi.logout().pipe(
      tap(() => {
        localStorage.removeItem(this.logoutPendingKey);
      }),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 0) {
          localStorage.setItem(this.logoutPendingKey, this.logoutPendingValue);

          return of(undefined);
        }

        return throwError(() => error);
      }),
      finalize(() => this.accessToken.set(null)),
    );
  }
}
