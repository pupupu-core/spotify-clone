import { GetTrackDiscoveryWorkflow } from '$/core/workflows/track/get-track-discovery.workflow';
import { UploadTrackWorkflow } from '$/core/workflows/track/upload-track.workflow';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS, UPLOAD_TRACK_CONSTRAINTS } from '@streaming-service/config';
import { TrackDiscoveryResponse, UploadTrackResponse } from '@streaming-service/model';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { UploadDto } from './dtos/upload.dto';
import { CurrentAccountId } from '../../decorators/current-account-id.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadTrackApiBodyOpenApiSchema } from './openapi/upload-track-api-body.schema';

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
}
