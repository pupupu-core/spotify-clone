import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import type { AutocompleteResponse } from '@streaming-service/model';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';
import { SearchApiService } from './search-api.service';

describe('SearchApiService', () => {
  let service: SearchApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(SearchApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests autocomplete suggestions with the provided limit', () => {
    const responseBody = {
      albums: [{ match: 'Discovery' }],
      artists: [],
      tags: [],
      tracks: [],
    } satisfies AutocompleteResponse;

    service.autocomplete('disco', 3).subscribe(response => {
      expect(response).toEqual(responseBody);
    });

    const request = httpMock.expectOne(
      candidate => candidate.url === APP_ENDPOINTS.SEARCH.AUTOCOMPLETE,
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('query')).toBe('disco');
    expect(request.request.params.get('limit')).toBe('3');

    request.flush(responseBody);
  });

  it('requests tracks using the default limit', () => {
    service.tracks('ambient').subscribe(response => {
      expect(response).toEqual([]);
    });

    const request = httpMock.expectOne(candidate => candidate.url === APP_ENDPOINTS.SEARCH.TRACKS);

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('query')).toBe('ambient');
    expect(request.request.params.get('limit')).toBe('50');

    request.flush([]);
  });
});
