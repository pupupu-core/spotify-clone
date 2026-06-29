import { GetTrackDiscoveryWorkflow } from '$/core/workflows/track/get-track-discovery.workflow';
import { UploadTrackWorkflow } from '$/core/workflows/track/upload-track.workflow';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS, UPLOAD_TRACK_CONSTRAINTS } from '@streaming-service/config';
import {
  CommunityTracksResponse,
  TrackDiscoveryResponse,
  UploadTrackResponse,
} from '@streaming-service/model';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { UploadDto } from './dtos/upload.dto';
import { CurrentAccountId } from '../../decorators/current-account-id.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadTrackApiBodyOpenApiSchema } from './openapi/upload-track-api-body.schema';
import { DeleteTrackWorkflow } from '$/core/workflows/track/delete-track.workflow';
import { RetrieveTrackAudioWorkflow } from '$/core/workflows/track/retrieve-track-audio.workflow';
import { ListCommunityTracksWorkflow } from '$/core/workflows/track/list-community-tracks.workflow';

@ApiTags(OPENAPI_CONFIG.tags.track)
@Controller({
  path: API_ENDPOINTS.TRACK.basePath,
  version: '1',
})
export class TrackController {
  public constructor(
    private readonly getTrackDiscoveryWorkflow: GetTrackDiscoveryWorkflow,
    private readonly uploadTrackWorkflow: UploadTrackWorkflow,
    private readonly deleteTrackWorkflow: DeleteTrackWorkflow,
    private readonly retrieveTrackAudioWorkflow: RetrieveTrackAudioWorkflow,
    private readonly listCommunityTracksWorkflow: ListCommunityTracksWorkflow,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.TRACK.DISCOVERY.serverPath)
  public async discovery(): Promise<TrackDiscoveryResponse> {
    return await this.getTrackDiscoveryWorkflow.execute();
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: UploadTrackApiBodyOpenApiSchema })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: UPLOAD_TRACK_CONSTRAINTS.limits.maxFileSizeBytes,
      },
    }),
  )
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(API_ENDPOINTS.TRACK.UPLOAD.serverPath)
  public async upload(
    @CurrentAccountId() accountId: string,
    @Body() dto: UploadDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: UPLOAD_TRACK_CONSTRAINTS.limits.maxFileSizeBytes,
          }),
          new FileTypeValidator({
            fileType: UPLOAD_TRACK_CONSTRAINTS.limits.typeRegex,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<UploadTrackResponse> {
    return await this.uploadTrackWorkflow.execute({ file, accountId, ...dto });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(API_ENDPOINTS.TRACK.DELETE.serverPath)
  public async delete(
    @CurrentAccountId() accountId: string,
    @Param('trackId') trackId: string,
  ): Promise<void> {
    return await this.deleteTrackWorkflow.execute({ accountId, trackId });
  }

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.TRACK.AUDIO.serverPath)
  public async audio(@Param('trackId') trackId: string): Promise<StreamableFile> {
    const audio = await this.retrieveTrackAudioWorkflow.execute({ trackId });

    return new StreamableFile(audio.body, {
      type: audio.contentType ?? 'audio/mpeg',
      length: audio.contentLength,
      disposition: 'inline',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.TRACK.COMMUNITY.serverPath)
  public async community(): Promise<CommunityTracksResponse> {
    return await this.listCommunityTracksWorkflow.execute();
  }
}
