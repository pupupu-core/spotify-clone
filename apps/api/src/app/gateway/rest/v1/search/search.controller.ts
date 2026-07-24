import { Controller, Get, Header, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@streaming-service/config';
import type { AutocompleteResponse, TrackResponse } from '@streaming-service/model';
import { GetAutocompleteWorkflow } from '$/core/workflows/search/get-autocomplete.workflow';
import { SearchTracksWorkflow } from '$/core/workflows/search/search-tracks.workflow';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { AutocompleteQueryDto, TrackSearchQueryDto } from './dtos/search-query.dto';
import { CurrentAccountId } from '../../decorators/current-account-id.decorator';
import { AccessTokenGuard } from '../../guards/access-token.guard';

@ApiTags(OPENAPI_CONFIG.tags.search)
@Controller({
  path: API_ENDPOINTS.SEARCH.basePath,
  version: '1',
})
export class SearchController {
  public constructor(
    private readonly getAutocompleteWorkflow: GetAutocompleteWorkflow,
    private readonly searchTracksWorkflow: SearchTracksWorkflow,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.SEARCH.AUTOCOMPLETE.serverPath)
  public async autocomplete(@Query() query: AutocompleteQueryDto): Promise<AutocompleteResponse> {
    return await this.getAutocompleteWorkflow.execute(query.query, query.limit ?? 5);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Header('Cache-Control', 'private, no-store')
  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.SEARCH.TRACKS.serverPath)
  public async tracks(
    @CurrentAccountId() accountId: string,
    @Query() query: TrackSearchQueryDto,
  ): Promise<TrackResponse[]> {
    return await this.searchTracksWorkflow.execute({
      accountId,
      includeUploads: query.includeUploads ?? false,
      limit: query.limit ?? 50,
      query: query.query,
    });
  }
}
