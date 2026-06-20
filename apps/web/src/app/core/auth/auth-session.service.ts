import { computed, inject, Injectable, signal } from '@angular/core';
import type { AuthTokenResponse, LoginRequest } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { AuthApiService } from '../api/auth/auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly authApi = inject(AuthApiService);
  private readonly accessToken = signal<string | null>(null);

  public readonly isAuthenticated = computed(() => this.accessToken() !== null);

  public login(request: LoginRequest): Observable<AuthTokenResponse> {
    return this.authApi.login(request).pipe(
      tap({
        next: ({ accessToken }) => {
          this.accessToken.set(accessToken);
        },
      }),
    );
  }
}
