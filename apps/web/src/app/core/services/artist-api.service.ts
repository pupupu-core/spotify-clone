import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { ArtistMusicInfoResponse } from '@streaming-service/model';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';

@Injectable({ providedIn: 'root' })
export class ArtistApiService {
  private readonly http = inject(HttpClient);

  public getMusicInfo(artistId: string): Observable<ArtistMusicInfoResponse> {
    return this.http.get<ArtistMusicInfoResponse>(APP_ENDPOINTS.ARTIST.MUSIC_INFO(artistId));
  }
}
