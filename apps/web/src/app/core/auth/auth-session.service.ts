import { computed, inject, Injectable, signal } from '@angular/core';
import type { AuthTokenResponse, LoginRequest, RegisterRequest } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs';
import { AuthApiService } from '../api/auth/auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly authApi = inject(AuthApiService);
  private readonly accessToken = signal<string | null>(null);

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
    return this.authApi.refresh().pipe(
      tap({
        next: ({ accessToken }) => this.accessToken.set(accessToken),
        error: () => this.accessToken.set(null),
      }),
    );
  }

  public logout(): Observable<void> {
    return this.authApi.logout().pipe(finalize(() => this.accessToken.set(null)));
  }
}
