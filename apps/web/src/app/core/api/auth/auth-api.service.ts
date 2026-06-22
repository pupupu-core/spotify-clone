import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { AuthTokenResponse, LoginRequest, RegisterRequest } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  public register(request: RegisterRequest): Observable<AuthTokenResponse> {
    return this.http.post<AuthTokenResponse>(APP_ENDPOINTS.AUTH.REGISTER, request, {
      withCredentials: true,
    });
  }

  public login(request: LoginRequest): Observable<AuthTokenResponse> {
    return this.http.post<AuthTokenResponse>(APP_ENDPOINTS.AUTH.LOGIN, request, {
      withCredentials: true,
    });
  }

  public logout(): Observable<void> {
    return this.http.post<void>(APP_ENDPOINTS.AUTH.LOGOUT, {}, { withCredentials: true });
  }

  public refresh(): Observable<AuthTokenResponse> {
    return this.http.post<AuthTokenResponse>(
      APP_ENDPOINTS.AUTH.REFRESH,
      {},
      { withCredentials: true },
    );
  }
}
