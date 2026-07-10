import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@streaming-service/config';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { PlaylistResponse } from '@streaming-service/model';
import { CreatePlaylistWorkflow } from '$/core/workflows/playlist/create-playlist.workflow';

@ApiTags(OPENAPI_CONFIG.tags.playlist)
@Controller({
  path: API_ENDPOINTS.PLAYLIST.basePath,
  version: '1',
})
export class PlyalistController {
  constructor(private readonly createPlaylistWorkflow: CreatePlaylistWorkflow) {}

  @HttpCode(HttpStatus.OK)
  @Post(API_ENDPOINTS.PLAYLIST.CREATE.serverPath)
  public async create(@Body() dto: CreatePlaylistDto): Promise<PlaylistResponse> {
    return await this.createPlaylistWorkflow.execute(dto);
  }
}
