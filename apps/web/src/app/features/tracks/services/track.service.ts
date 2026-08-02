import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type {
  AccountTracksResponse,
  TrackDiscoveryResponse,
  UploadTrackRequest,
  UploadTrackResponse,
} from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly http = inject(HttpClient);

  public fetchDiscover(): Observable<TrackDiscoveryResponse> {
    return this.http.get<TrackDiscoveryResponse>(APP_ENDPOINTS.DISCOVER.TRACKS);
  }

  public uploadTrack({
    file,
    title,
    artistName,
    albumName,
    genres,
  }: UploadTrackRequest & { file: File }): Observable<UploadTrackResponse> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('title', title);
    formData.append('artistName', artistName);

    if (albumName !== undefined && albumName.length > 0) {
      formData.append('albumName', albumName);
    }

    if (genres !== undefined && genres.length > 0) {
      formData.append('genres', genres.join(','));
    }

    return this.http.post<UploadTrackResponse>(APP_ENDPOINTS.TRACK.UPLOAD, formData);
  }

  public fetchMyUploads(): Observable<AccountTracksResponse> {
    return this.http.get<AccountTracksResponse>(APP_ENDPOINTS.ACCOUNT.TRACKS);
  }
}
