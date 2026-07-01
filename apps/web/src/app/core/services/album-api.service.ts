import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { AlbumResponse } from '@streaming-service/model';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';

@Injectable()
export class AlbumApiService {
  private readonly http = inject(HttpClient);

  public getAlbum(albumId: string): Observable<AlbumResponse> {
    return this.http.get<AlbumResponse>(APP_ENDPOINTS.ALBUMS.TRACKS(albumId));
  }
}
