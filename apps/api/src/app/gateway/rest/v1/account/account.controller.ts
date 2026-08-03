import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@streaming-service/config';
import {
  AccountMeResponse,
  AccountTracksResponse,
  RecentlyPlayedResponse,
  RecentlyPlayedTrackResponse,
} from '@streaming-service/model';
import { GetAccountMeWorkflow } from '$/core/workflows/account/get-current-me-account.workflow';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { CurrentAccountId } from '../../decorators/current-account-id.decorator';
import { SkipThrottle } from '@nestjs/throttler';
import { ListAccountTracksWorkflow } from '$/core/workflows/account/list-account-tracks.workflow';
import { ListRecentlyPlayedWorkflow } from '$/core/workflows/account/list-recently-played.workflow';
import { RecordRecentlyPlayedWorkflow } from '$/core/workflows/account/record-recently-played.workflow';
import { RecordRecentlyPlayedTrackDto } from './dtos/recently-played.dto';

@ApiTags(OPENAPI_CONFIG.tags.account)
@Controller({
  path: API_ENDPOINTS.ACCOUNT.basePath,
  version: '1',
})
export class AccountController {
  public constructor(
    private readonly getAccountMeWorkflow: GetAccountMeWorkflow,
    private readonly listAccountTracksWorkflow: ListAccountTracksWorkflow,
    private readonly listRecentlyPlayedWorkflow: ListRecentlyPlayedWorkflow,
    private readonly recordRecentlyPlayedWorkflow: RecordRecentlyPlayedWorkflow,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  @SkipThrottle()
  @Get(API_ENDPOINTS.ACCOUNT.ME.serverPath)
  public me(@CurrentAccountId() accountId: string): Promise<AccountMeResponse> {
    return this.getAccountMeWorkflow.execute({ accountId });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.ACCOUNT.TRACKS.serverPath)
  public tracks(@CurrentAccountId() accountId: string): Promise<AccountTracksResponse> {
    return this.listAccountTracksWorkflow.execute({ accountId });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.ACCOUNT.RECENTLY_PLAYED.serverPath)
  public recentlyPlayed(@CurrentAccountId() accountId: string): Promise<RecentlyPlayedResponse> {
    return this.listRecentlyPlayedWorkflow.execute({ accountId });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.CREATED)
  @Post(API_ENDPOINTS.ACCOUNT.RECENTLY_PLAYED.serverPath)
  public recordRecentlyPlayed(
    @CurrentAccountId() accountId: string,
    @Body() dto: RecordRecentlyPlayedTrackDto,
  ): Promise<RecentlyPlayedTrackResponse> {
    return this.recordRecentlyPlayedWorkflow.execute({ accountId, ...dto });
  }
}
