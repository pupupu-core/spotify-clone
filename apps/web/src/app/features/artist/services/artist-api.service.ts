import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type {
  ArtistAlbumsResponse,
  ArtistMusicInfoResponse,
  ArtistTracksResponse,
} from '@streaming-service/model';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';

@Injectable()
export class ArtistApiService {
  private readonly http = inject(HttpClient);

  public getMusicInfo(artistId: string): Observable<ArtistMusicInfoResponse> {
    return this.http.get<ArtistMusicInfoResponse>(APP_ENDPOINTS.ARTIST.MUSIC_INFO(artistId));
  }

  public getArtistPopularTrack(artistId: string): Observable<ArtistTracksResponse> {
    return this.http.get<ArtistTracksResponse>(APP_ENDPOINTS.ARTIST.TRACKS(artistId));
  }

  public getArtistAlbums(artistId: string): Observable<ArtistAlbumsResponse> {
    return this.http.get<ArtistAlbumsResponse>(APP_ENDPOINTS.ARTIST.ALBUMS(artistId));
  }
}
