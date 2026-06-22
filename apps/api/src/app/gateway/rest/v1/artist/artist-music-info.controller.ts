import { ApiTags } from '@nestjs/swagger';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { API_ENDPOINTS } from '@streaming-service/config';
import { GetMusicInfoArtistWorkflow } from '$/core/workflows/artist/get-music-info-artist.workflow';
import { ArtistMusicInfoResponse } from '@streaming-service/model';

@ApiTags(OPENAPI_CONFIG.tags.artist)
@Controller({
  path: API_ENDPOINTS.ARTIST.basePath,
  version: '1',
})
export class ArtistMusicInfoController {
  constructor(private readonly workflow: GetMusicInfoArtistWorkflow) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.ARTIST.MUSIC_INFO.serverPath)
  public async getMusicInfo(@Param('artistId') artistId: string): Promise<ArtistMusicInfoResponse> {
    return await this.workflow.execute(Number(artistId));
  }
}
