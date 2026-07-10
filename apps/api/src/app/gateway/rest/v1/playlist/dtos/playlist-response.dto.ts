import { ApiProperty } from '@nestjs/swagger';
import { PlaylistEntry, PlaylistResponse, PlaylistVisibility } from '@streaming-service/model';

export class PlaylistResponseDto implements PlaylistResponse {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public description: string | null;

  @ApiProperty()
  public visibility: PlaylistVisibility;

  @ApiProperty()
  public coverUrl: string | null;

  @ApiProperty()
  public trackCount: number;

  @ApiProperty()
  public totalDurationSec: number;

  @ApiProperty()
  public createdAt: string;

  @ApiProperty()
  public updatedAt: string;

  @ApiProperty()
  public entries: PlaylistEntry[];
}
