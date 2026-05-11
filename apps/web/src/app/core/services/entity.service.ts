import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_ENDPOINTS } from 'streaming-service/config';
import type { EntityResponse } from 'streaming-service/model';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  public entityResource = httpResource<EntityResponse>(() => API_ENDPOINTS.entity.clientUrl);
}
