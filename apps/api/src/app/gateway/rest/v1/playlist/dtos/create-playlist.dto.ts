import { ApiProperty } from '@nestjs/swagger';
import { PLAYLIST_CONSTRAINTS } from '@streaming-service/config';
import {
  CreatePlaylistRequest,
  PlaylistTrackReference,
  PlaylistVisibility,
} from '@streaming-service/model';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { trimPlaylistTextField } from '../transformers/create-playlist.transformer';
import { PlaylistTrackReferenceDto } from './playlist-track-reference.dto';

export class CreatePlaylistDto implements CreatePlaylistRequest {
  @ApiProperty({ required: true, example: 'My playlist for studying' })
  @IsString()
  @MinLength(PLAYLIST_CONSTRAINTS.name.minLength)
  @MaxLength(PLAYLIST_CONSTRAINTS.name.maxLength)
  @Transform(trimPlaylistTextField)
  public name: string;

  @ApiProperty({ required: false, example: 'This is a description for my playlist for studying' })
  @IsOptional()
  @IsString()
  @MaxLength(PLAYLIST_CONSTRAINTS.description.maxLength)
  public description?: string | null;

  @ApiProperty({ required: false, example: 'public' })
  @IsOptional()
  @IsIn(['private', 'public', 'unlisted'])
  public visibility?: PlaylistVisibility;

  @ApiProperty({
    required: true,
    example: [{ source: 'jamendo', externalId: '2332430' }],
    type: 'array',
    items: {
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
    },
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlaylistTrackReferenceDto)
  public tracks: PlaylistTrackReference[];
}
