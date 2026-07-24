import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export const INCLUDE_UPLOADS_STORAGE_KEY = 'search.includeUploads';

@Injectable({ providedIn: 'root' })
export class SearchPreferencesService {
  private readonly storage = inject(DOCUMENT).defaultView?.localStorage;
  private readonly includeUploadsState = signal(this.readIncludeUploads());

  public readonly includeUploads = this.includeUploadsState.asReadonly();

  public setIncludeUploads(includeUploads: boolean): void {
    this.includeUploadsState.set(includeUploads);

    try {
      this.storage?.setItem(INCLUDE_UPLOADS_STORAGE_KEY, String(includeUploads));
    } catch {
      console.log("i am sorry, but i can't persist it in the localStorage");
    }
  }

  private readIncludeUploads(): boolean {
    try {
      return this.storage?.getItem(INCLUDE_UPLOADS_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }
}
