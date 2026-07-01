import { Module } from '@nestjs/common';
import { GetAutocompleteWorkflow } from '$/core/workflows/search/get-autocomplete.workflow';
import { SearchTracksWorkflow } from '$/core/workflows/search/search-tracks.workflow';
import { FetchAutocompleteStep } from '$/core/steps/fetch-autocomplete.step';
import { FetchSearchTracksStep } from '$/core/steps/fetch-search-tracks.step';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { SearchController } from './search.controller';

@Module({
  imports: [JamendoModule],
  controllers: [SearchController],
  providers: [
    GetAutocompleteWorkflow,
    SearchTracksWorkflow,
    FetchAutocompleteStep,
    FetchSearchTracksStep,
  ],
})
export class SearchModule {}
