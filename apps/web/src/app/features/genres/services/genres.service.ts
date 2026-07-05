import { Injectable, signal } from '@angular/core';
import { pickRandomItemFromList } from '@streaming-service/utils';
import { MUSIC_GENRES_MOCK } from '~/core/mocks/tracks.mocks';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  // genres are hardcoded for mvp
  // TODO fetch jamendo genres and get most popular
  private readonly genresState = signal<(typeof MUSIC_GENRES_MOCK)[number][]>(
    pickRandomItemFromList(MUSIC_GENRES_MOCK, 10),
  );

  public readonly genreList = this.genresState.asReadonly();
}
