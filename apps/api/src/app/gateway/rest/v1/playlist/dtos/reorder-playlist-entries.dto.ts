import { ExactlyOneField } from '$/gateway/rest/validators/exactly-one-field.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReorderPlaylistEntriesRequest } from '@streaming-service/model';
import { IsOptional, IsUUID } from 'class-validator';

export class ReorderPlaylistEntriesDto implements ReorderPlaylistEntriesRequest {
  @ApiProperty({
    required: true,
    example: '4f2f98c8-28f4-4f2e-8c9c-4ac4d23a6e34',
  })
  @IsUUID()
  public entryId: string;

  @ApiPropertyOptional({
    example: '84dd948d-7fd0-4226-8a9a-fb9963a40a1f',
    description: 'Move entry before this playlist entry. Use either beforeEntryId or afterEntryId.',
  })
  @IsOptional()
  @IsUUID()
  public beforeEntryId?: string;

  @ApiPropertyOptional({
    example: '6daf7ea2-56e4-44ff-9184-c67ac6a90891',
    description: 'Move entry after this playlist entry. Use either beforeEntryId or afterEntryId.',
  })
  @IsOptional()
  @IsUUID()
  public afterEntryId?: string;

  @ExactlyOneField(['beforeEntryId', 'afterEntryId'], {
    message: 'Exactly one of beforeEntryId or afterEntryId is required.',
  })
  private readonly reorderTarget?: never;
}
