import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@streaming-service/config';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { PlaylistResponse, PlaylistsPreviewResponse } from '@streaming-service/model';
import { CreatePlaylistWorkflow } from '$/core/workflows/playlist/create-playlist.workflow';
import { PlaylistResponseDto } from './dtos/playlist-response.dto';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { CurrentAccountId } from '../../decorators/current-account-id.decorator';
import { ListAccountPlaylistsWorkflow } from '$/core/workflows/playlist/list-account-playlists.workflow';
import { GetPlaylistWorkflow } from '$/core/workflows/playlist/get-playlist.workflow';
import { DeletePlaylistWorkflow } from '$/core/workflows/playlist/delete-playlist.workflow';
import { ListCommunityPlaylistsWorkflow } from '$/core/workflows/playlist/list-community-playlists.workflow';
import { UpdatePlaylistDto } from './dtos/update-playlist.dto';
import { UpdatePlaylistWorkflow } from '$/core/workflows/playlist/update-playlist.workflow';
import { AddPlaylistEntryDto } from './dtos/add-playlist-entry.dto';
import { AddPlaylistEntryWorkflow } from '$/core/workflows/playlist/add-playlist-entry.workflow';
import { RemovePlaylistEntryWorkflow } from '$/core/workflows/playlist/remove-playlist-entry.workflow';

@ApiTags(OPENAPI_CONFIG.tags.playlist)
@Controller({
  path: API_ENDPOINTS.PLAYLIST.basePath,
  version: '1',
})
export class PlyalistController {
  constructor(
    private readonly createPlaylistWorkflow: CreatePlaylistWorkflow,
    private readonly getPlaylistWorkflow: GetPlaylistWorkflow,
    private readonly listAccountPlaylistsWorkflow: ListAccountPlaylistsWorkflow,
    private readonly deletePlaylistWorkflow: DeletePlaylistWorkflow,
    private readonly listCommunityPlaylistsWorkflow: ListCommunityPlaylistsWorkflow,
    private readonly updatePlaylistWorkflow: UpdatePlaylistWorkflow,
    private readonly addPlaylistEntryWorkflow: AddPlaylistEntryWorkflow,
    private readonly removePlaylistEntryWorkflow: RemovePlaylistEntryWorkflow,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.PLAYLIST.COMMUNITY.serverPath)
  public async community(): Promise<PlaylistsPreviewResponse> {
    return await this.listCommunityPlaylistsWorkflow.execute();
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.PLAYLIST.LIST.serverPath)
  public async list(@CurrentAccountId() accountId: string): Promise<PlaylistsPreviewResponse> {
    return await this.listAccountPlaylistsWorkflow.execute({ accountId });
  }

  @ApiCreatedResponse({
    description: 'Playlist created successfully',
    type: PlaylistResponseDto,
  })
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

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.PLAYLIST.DETAIL.serverPath)
  public async detail(
    @CurrentAccountId() accountId: string,
    @Param('playlistId') playlistId: string,
  ): Promise<PlaylistResponse> {
    return await this.getPlaylistWorkflow.execute({ accountId, playlistId });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Put(API_ENDPOINTS.PLAYLIST.UPDATE.serverPath)
  public async update(
    @CurrentAccountId() accountId: string,
    @Param('playlistId') playlistId: string,
    @Body() dto: UpdatePlaylistDto,
  ): Promise<PlaylistResponse> {
    return await this.updatePlaylistWorkflow.execute({ accountId, playlistId, ...dto });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(API_ENDPOINTS.PLAYLIST.DELETE.serverPath)
  public async delete(
    @CurrentAccountId() accountId: string,
    @Param('playlistId') playlistId: string,
  ): Promise<void> {
    return await this.deletePlaylistWorkflow.execute({ accountId, playlistId });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(API_ENDPOINTS.PLAYLIST.ADD_ENTRY.serverPath)
  public async addEntry(
    @CurrentAccountId() accountId: string,
    @Param('playlistId') playlistId: string,
    @Body() dto: AddPlaylistEntryDto,
  ): Promise<PlaylistResponse> {
    return await this.addPlaylistEntryWorkflow.execute({ accountId, playlistId, ...dto });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(API_ENDPOINTS.PLAYLIST.REMOVE_ENTRY.serverPath)
  public async removeEntry(
    @CurrentAccountId() accountId: string,
    @Param('playlistId') playlistId: string,
    @Param('entryId') entryId: string,
  ): Promise<PlaylistResponse> {
    return await this.removePlaylistEntryWorkflow.execute({ accountId, playlistId, entryId });
  }
}
