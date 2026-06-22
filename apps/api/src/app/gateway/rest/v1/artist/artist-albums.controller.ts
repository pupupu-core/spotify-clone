import { API_ENDPOINTS } from '@streaming-service/config';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { GetAlbumArtistWorkflow } from '$/core/workflows/artist/get-albums-artist.workflow';

@ApiTags(OPENAPI_CONFIG.tags.artist)
@Controller({
  path: API_ENDPOINTS.ARTIST.basePath,
  version: '1',
})
export class ArtistAlbumsController {
  constructor(private readonly workflow: GetAlbumArtistWorkflow) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.ARTIST.ALBUMS.serverPath)
  public async getTracks(@Param('artistId') artistId: string) {
    return this.workflow.execute(Number(artistId));
  }
}
