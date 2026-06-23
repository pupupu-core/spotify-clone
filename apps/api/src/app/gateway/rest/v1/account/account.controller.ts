import { OPENAPI_CONFIG } from '$/shared/config/openapi.config';
import { Controller, Get, Header, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@streaming-service/config';
import { AccountMeResponse } from '@streaming-service/model';
import { GetAccountMeWorkflow } from '$/core/workflows/account/get-current-me-account.workflow';
import { AccessTokenGuard } from '../../guards/access-token.guard';
import { CurrentAccountId } from '../../decorators/current-account-id.decorator';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags(OPENAPI_CONFIG.tags.account)
@Controller({
  path: API_ENDPOINTS.ACCOUNT.basePath,
  version: '1',
})
export class AccountController {
  public constructor(private readonly getAccountMeWorkflow: GetAccountMeWorkflow) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  @SkipThrottle()
  @Get(API_ENDPOINTS.ACCOUNT.ME.serverPath)
  public me(@CurrentAccountId() accountId: string): Promise<AccountMeResponse> {
    return this.getAccountMeWorkflow.execute({ accountId });
  }
}
