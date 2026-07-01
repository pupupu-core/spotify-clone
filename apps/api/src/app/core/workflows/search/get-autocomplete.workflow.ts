import { Injectable } from '@nestjs/common';
import type { AutocompleteResponse } from '@streaming-service/model';
import { FetchAutocompleteStep } from '$/core/steps/fetch-autocomplete.step';

@Injectable()
export class GetAutocompleteWorkflow {
  public constructor(private readonly fetchAutocompleteStep: FetchAutocompleteStep) {}

  public async execute(query: string, limit: number): Promise<AutocompleteResponse> {
    return await this.fetchAutocompleteStep.execute(query.trim(), limit);
  }
}
