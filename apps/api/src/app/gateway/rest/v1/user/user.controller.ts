import { GetUserIdentityWorkflow } from '$/core/workflows/user/get-user-identity.workflow';
import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@streaming-service/config';
import { AuthTokenResponse } from '@streaming-service/model';

@ApiTags(OPENAPI_CONFIG.tags.user)
@Controller({
  path: API_ENDPOINTS.USER.basePath,
  version: '1',
})
export class UserController {
  public constructor(private readonly getUserIdentityWorkflow: GetUserIdentityWorkflow) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ENDPOINTS.USER.ME.serverPath)
  public me(): Promise<AuthTokenResponse> {
    return this.getUserIdentityWorkflow.execute();
  }
}
