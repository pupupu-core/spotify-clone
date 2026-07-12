import { AtLeastOneField } from '$/gateway/rest/validators/at-least-one-field.validators';
import { ApiProperty } from '@nestjs/swagger';
import { PLAYLIST_CONSTRAINTS } from '@streaming-service/config';
import { PlaylistVisibility, UpdatePlaylistRequest } from '@streaming-service/model';
import { IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePlaylistDto implements UpdatePlaylistRequest {
  @ApiProperty({ required: false, example: 'My playlist' })
  @IsOptional()
  @IsString()
  @MinLength(PLAYLIST_CONSTRAINTS.name.minLength)
  @MaxLength(PLAYLIST_CONSTRAINTS.name.maxLength)
  public name?: string;

  @ApiProperty({ required: false, example: 'My playlist description' })
  @IsOptional()
  @IsString()
  @MaxLength(PLAYLIST_CONSTRAINTS.description.maxLength)
  public description?: string;

  @ApiProperty({ required: false, example: 'private' })
  @IsOptional()
  @IsIn(['private', 'public', 'unlisted'])
  public visibility?: PlaylistVisibility;

  @AtLeastOneField({
    fields: ['name', 'description', 'visibility'],
    validationOptions: {
      message: 'At least one field is required',
    },
  })
  private readonly atLeastOneField?: never;
}
