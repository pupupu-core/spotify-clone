import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '@streaming-service/config';
import type {
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
    return this.http.post<UploadTrackResponse>(
      API_ENDPOINTS.TRACK.UPLOAD.clientUrl,
      {
        file,
        title,
        artistName,
        albumName,
        genres,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data',
        }),
      },
    );
  }
}
