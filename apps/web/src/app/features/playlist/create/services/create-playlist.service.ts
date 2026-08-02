import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';
import type { CreatePlaylistRequest, PlaylistResponse } from '@streaming-service/model';

@Injectable({
  providedIn: 'root',
})
export class CreatePlaylistService {
  private readonly http = inject(HttpClient);

  public createPlaylist(request: CreatePlaylistRequest): Observable<PlaylistResponse> {
    return this.http.post<PlaylistResponse>(APP_ENDPOINTS.PLAYLIST.CREATE, request);
  }
}
