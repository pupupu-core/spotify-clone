import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type {
  AccountMeResponse,
  RecentlyPlayedResponse,
  RecentlyPlayedTrackResponse,
  RecordRecentlyPlayedTrackRequest,
} from '@streaming-service/model';
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

  public recentlyPlayed(): Observable<RecentlyPlayedResponse> {
    return this.http.get<RecentlyPlayedResponse>(APP_ENDPOINTS.ACCOUNT.RECENTLY_PLAYED, {
      withCredentials: true,
    });
  }

  public recordRecentlyPlayed(
    request: RecordRecentlyPlayedTrackRequest,
  ): Observable<RecentlyPlayedTrackResponse> {
    return this.http.post<RecentlyPlayedTrackResponse>(
      APP_ENDPOINTS.ACCOUNT.RECENTLY_PLAYED,
      request,
      {
        withCredentials: true,
      },
    );
  }
}
