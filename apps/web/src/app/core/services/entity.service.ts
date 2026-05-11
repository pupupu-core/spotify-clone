import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_ENDPOINTS } from '@angular-nest-monorepo-starter/config';
import type { EntityResponse } from '@angular-nest-monorepo-starter/model';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  public entityResource = httpResource<EntityResponse>(() => API_ENDPOINTS.entity.clientUrl);
}
