import { ApiTags } from '@nestjs/swagger';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { API_ENDPOINTS } from '@streaming-service/config';
import { GetTracksAlbumWorkflow } from '$/core/workflows/albums/get-tracks-album.workflow';
import { AlbumResponse } from '@streaming-service/model';

@ApiTags(OPENAPI_CONFIG.tags.album)
@Controller({
  path: API_ENDPOINTS.ALBUMS.basePath,
  version: '1',
})
export class AlbumTracksController {
  public constructor(private readonly getTracksAlbumWorkflow: GetTracksAlbumWorkflow) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.ALBUMS.TRACKS.serverPath)
  public async getTracks(@Param('albumId') albumId: string): Promise<AlbumResponse> {
    return await this.getTracksAlbumWorkflow.execute(Number(albumId));
  }
}
