import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private readonly genresState = signal<string[]>([
    // genres are hardcoded for mvp
    // TODO fetch jamendo genres and get most popular
    'rock',
    'latin',
    'pop',
    'Electronic',
    'Hip-Hop',
  ]);
  public readonly genreList = this.genresState.asReadonly();
}
