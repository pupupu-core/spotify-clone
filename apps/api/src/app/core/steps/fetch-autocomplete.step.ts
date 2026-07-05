import { Injectable } from '@nestjs/common';
import type { AutocompleteResponse } from '@streaming-service/model';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';

@Injectable()
export class FetchAutocompleteStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(query: string, limit: number): Promise<AutocompleteResponse> {
    return await this.jamendoClient.autocomplete({
      prefix: query,
      limit,
      matchcount: true,
    });
  }
}
