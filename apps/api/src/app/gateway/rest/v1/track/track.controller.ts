import { GetTrackDiscoveryWorkflow } from '$/core/workflows/track/get-track-discovery.workflow';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@streaming-service/config';
import { TrackDiscoveryResponse } from '@streaming-service/model';

@ApiTags(OPENAPI_CONFIG.tags.track)
@Controller({
  path: API_ENDPOINTS.TRACK.basePath,
  version: '1',
})
export class TrackController {
  public constructor(private readonly getTrackDiscoveryWorkflow: GetTrackDiscoveryWorkflow) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.TRACK.DISCOVERY.serverPath)
  public async discovery(): Promise<TrackDiscoveryResponse> {
    return await this.getTrackDiscoveryWorkflow.execute();
  }
}
