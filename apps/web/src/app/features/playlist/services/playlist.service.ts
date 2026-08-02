import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { PlaylistsPreviewResponse } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private readonly http = inject(HttpClient);

  public fetchMyPlaylists(): Observable<PlaylistsPreviewResponse> {
    return this.http.get<PlaylistsPreviewResponse>(APP_ENDPOINTS.PLAYLIST.LIST);
  }
}
