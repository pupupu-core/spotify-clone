import { API_ENDPOINTS } from '@streaming-service/config';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { GetTrackArtistWorkflow } from '$/core/workflows/artist/get-track-artist.workflow';
import { ApiTags } from '@nestjs/swagger';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { ArtistTracksResponse } from '@streaming-service/model';

@ApiTags(OPENAPI_CONFIG.tags.artist)
@Controller({
  path: API_ENDPOINTS.ARTIST.basePath,
  version: '1',
})
export class ArtistTrackController {
  constructor(private readonly workflow: GetTrackArtistWorkflow) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.ARTIST.TRACKS.serverPath)
  public async getTracks(@Param('artistId') artistId: string): Promise<ArtistTracksResponse> {
    return await this.workflow.execute(Number(artistId));
  }
}
