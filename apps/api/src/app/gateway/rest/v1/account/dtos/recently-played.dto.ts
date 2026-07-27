import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  RecentlyPlayedTrackSource,
  RecordRecentlyPlayedTrackRequest,
} from '@streaming-service/model';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

const RECENTLY_PLAYED_TRACK_SOURCES: RecentlyPlayedTrackSource[] = ['jamendo', 'userUpload'];

export class RecordRecentlyPlayedTrackDto implements RecordRecentlyPlayedTrackRequest {
  @ApiProperty({ example: '1848357' })
  @IsString()
  public id: string;

  @ApiProperty({ example: 'manana sera tarde' })
  @IsString()
  public name: string;

  @ApiProperty({ example: 272 })
  @IsNumber()
  @Min(0)
  public duration: number;

  @ApiProperty({ example: '421168' })
  @IsString()
  public artistId: string;

  @ApiProperty({ example: 'fankel' })
  @IsString()
  public artistName: string;

  @ApiPropertyOptional({ example: 'manana sera tarde', nullable: true })
  @IsOptional()
  @IsString()
  public albumName?: string | null;

  @ApiPropertyOptional({ example: '368084', nullable: true })
  @IsOptional()
  @IsString()
  public albumId?: string | null;

  @ApiPropertyOptional({
    example: 'https://usercontent.jamendo.com?type=album&id=368084&width=300&trackid=1848357',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  public imageUrl?: string | null;

  @ApiPropertyOptional({
    example: 'https://usercontent.jamendo.com?type=album&id=368084&width=300&trackid=1848357',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  public albumImageUrl?: string | null;

  @ApiProperty({
    example: 'https://prod-1.storage.jamendo.com/?trackid=1848357&format=mp31',
  })
  @IsString()
  public audioUrl: string;

  @ApiProperty({ enum: RECENTLY_PLAYED_TRACK_SOURCES, example: 'jamendo' })
  @IsIn(RECENTLY_PLAYED_TRACK_SOURCES)
  public source: RecentlyPlayedTrackSource;

  @ApiPropertyOptional({ example: 0, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  public positionSec?: number | null;
}
