import { GetCurrentAccountWorkflow } from '$/core/workflows/user/get-current-account.workflow';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@streaming-service/config';
import { AuthTokenResponse } from '@streaming-service/model';

@ApiTags(OPENAPI_CONFIG.tags.account)
@Controller({
  path: API_ENDPOINTS.ACCOUNT.basePath,
  version: '1',
})
export class UserController {
  public constructor(private readonly getCurrentAccountWorkflow: GetCurrentAccountWorkflow) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.ACCOUNT.ME.serverPath)
  public me(): Promise<AuthTokenResponse> {
    return this.getCurrentAccountWorkflow.execute();
  }
}
