import { GetTrackDiscoveryWorkflow } from '$/core/workflows/track/get-track-discovery.workflow';
import { UploadTrackWorkflow } from '$/core/workflows/track/upload-track.workflow';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@streaming-service/config';
import { TrackDiscoveryResponse } from '@streaming-service/model';
import { AccessTokenGuard } from '../../guards/access-token.guard';

@ApiTags(OPENAPI_CONFIG.tags.track)
@Controller({
  path: API_ENDPOINTS.TRACK.basePath,
  version: '1',
})
export class TrackController {
  public constructor(
    private readonly getTrackDiscoveryWorkflow: GetTrackDiscoveryWorkflow,
    private readonly uploadTrackWorkflow: UploadTrackWorkflow,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.TRACK.DISCOVERY.serverPath)
  public async discovery(): Promise<TrackDiscoveryResponse> {
    return await this.getTrackDiscoveryWorkflow.execute();
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(API_ENDPOINTS.TRACK.UPLOAD.serverPath)
  public async upload(): Promise<void> {
    return await this.uploadTrackWorkflow.execute();
  }
}
