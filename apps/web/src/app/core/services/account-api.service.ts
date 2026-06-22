import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { AccountMeResponse } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  private readonly http = inject(HttpClient);

  public me(): Observable<AccountMeResponse> {
    return this.http.get<AccountMeResponse>(APP_ENDPOINTS.ACCOUNT.ME, {
      withCredentials: true,
    });
  }
}
