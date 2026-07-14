import { ApiProperty } from '@nestjs/swagger';
import { AddPlaylistEntryRequest, PlaylistTrackReference } from '@streaming-service/model';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PlaylistTrackReferenceDto } from './playlist-track-reference.dto';

export class AddPlaylistEntryDto implements AddPlaylistEntryRequest {
  @ApiProperty({
    required: true,
    example: {
      source: 'jamendo',
      externalId: '2332430',
    },
    oneOf: [
      {
        type: 'object',
        properties: {
          source: { type: 'string', example: 'jamendo' },
          externalId: { type: 'string', example: '2332430' },
        },
      },
      {
        type: 'object',
        properties: {
          source: { type: 'string', example: 'userUpload' },
          trackId: { type: 'string', example: '4f2f98c8-28f4-4f2e-8c9c-4ac4d23a6e34' },
        },
      },
    ],
  })
  @ValidateNested()
  @Type(() => PlaylistTrackReferenceDto)
  public track: PlaylistTrackReference;
}
