import { Module } from '@nestjs/common';
import { GetAutocompleteWorkflow } from '$/core/workflows/search/get-autocomplete.workflow';
import { SearchTracksWorkflow } from '$/core/workflows/search/search-tracks.workflow';
import { FetchAutocompleteStep } from '$/core/steps/fetch-autocomplete.step';
import { FetchSearchTracksStep } from '$/core/steps/fetch-search-tracks.step';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { SearchController } from './search.controller';
import { SearchUploadedTracksStep } from '$/core/steps/search-uploaded-tracks.step';
import { PrismaModule } from '$/infrastructure/prisma/prisma.module';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { AccessTokenGuard } from '../../guards/access-token.guard';

@Module({
  imports: [JamendoModule, PrismaModule, AuthTokenModule],
  controllers: [SearchController],
  providers: [
    GetAutocompleteWorkflow,
    SearchTracksWorkflow,
    FetchAutocompleteStep,
    FetchSearchTracksStep,
    SearchUploadedTracksStep,
    AccessTokenGuard,
  ],
})
export class SearchModule {}
