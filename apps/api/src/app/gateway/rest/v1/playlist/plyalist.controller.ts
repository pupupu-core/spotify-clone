import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@streaming-service/config';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { PlaylistResponse } from '@streaming-service/model';
import { CreatePlaylistWorkflow } from '$/core/workflows/playlist/create-playlist.workflow';
import { PlaylistResponseDto } from './dtos/playlist-response.dto';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { CurrentAccountId } from '../../decorators/current-account-id.decorator';

@ApiTags(OPENAPI_CONFIG.tags.playlist)
@ApiCreatedResponse({
  description: 'Playlist created successfully',
  type: PlaylistResponseDto,
})
@Controller({
  path: API_ENDPOINTS.PLAYLIST.basePath,
  version: '1',
})
export class PlyalistController {
  constructor(private readonly createPlaylistWorkflow: CreatePlaylistWorkflow) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(API_ENDPOINTS.PLAYLIST.CREATE.serverPath)
  public async create(
    @CurrentAccountId() accountId: string,
    @Body() dto: CreatePlaylistDto,
  ): Promise<PlaylistResponse> {
    return await this.createPlaylistWorkflow.execute({
      accountId,
      ...dto,
    });
  }
}
