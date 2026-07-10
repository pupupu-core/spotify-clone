import { ApiProperty } from '@nestjs/swagger';
import { PLAYLIST_CONSTRAINTS } from '@streaming-service/config';
import {
  CreatePlaylistRequest,
  PlaylistTrackReference,
  PlaylistVisibility,
} from '@streaming-service/model';
import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { trimPlaylistTextField } from '../transformers/create-playlist.transformer';

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

  @ApiProperty({ required: true, example: [{ source: 'jamendo', externalId: '' }] })
  @IsArray()
  public tracks: PlaylistTrackReference[];
}
