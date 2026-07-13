import { computed, inject, Injectable, signal } from '@angular/core';
import type { AuthTokenResponse, LoginRequest, RegisterRequest } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { finalize, shareReplay, tap } from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly authApi = inject(AuthApiService);
  private readonly accessToken = signal<string | null>(null);
  private refreshRequest$: Observable<AuthTokenResponse> | null = null;

  public readonly isAuthenticated = computed(() => this.accessToken() !== null);

  public getAccessToken(): string | null {
    return this.accessToken();
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
    return this.authApi.logout().pipe(finalize(() => this.accessToken.set(null)));
  }
}
