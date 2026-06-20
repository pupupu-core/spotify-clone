import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { AuthTokenResponse, LoginRequest } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  public login(request: LoginRequest): Observable<AuthTokenResponse> {
    return this.http.post<AuthTokenResponse>(APP_ENDPOINTS.AUTH.LOGIN, request, {
      withCredentials: true,
    });
  }
}
