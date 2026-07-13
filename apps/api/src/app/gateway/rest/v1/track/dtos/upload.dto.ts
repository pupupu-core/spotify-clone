import { ApiProperty } from '@nestjs/swagger';
import { UPLOAD_TRACK_CONSTRAINTS } from '@streaming-service/config';
import { UploadTrackRequest } from '@streaming-service/model';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UploadDto implements UploadTrackRequest {
  @ApiProperty({ example: 'Gift Horse' })
  @MinLength(UPLOAD_TRACK_CONSTRAINTS.title.minLength)
  @MaxLength(UPLOAD_TRACK_CONSTRAINTS.title.maxLength)
  public title: string;

  @ApiProperty({ example: 'IDLES' })
  @MinLength(UPLOAD_TRACK_CONSTRAINTS.artistName.minLength)
  @MaxLength(UPLOAD_TRACK_CONSTRAINTS.artistName.maxLength)
  public artistName: string;

  @ApiProperty({ example: 'TANGK', required: false })
  @IsOptional()
  @MaxLength(UPLOAD_TRACK_CONSTRAINTS.albumName.maxLength)
  public albumName?: string;

  @ApiProperty({ example: true })
  public isSingle: boolean;

  @ApiProperty({ example: false })
  public isPrivate: boolean;

  @ApiProperty({ example: ['Rock', 'Post-Punk'], required: false })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    const arr = Array.isArray(value) ? (value as string[]) : ([value].filter(Boolean) as string[]);

    return arr.flatMap(v => (typeof v === 'string' ? v.split(',').map(s => s.trim()) : v));
  })
  @IsArray()
  @ArrayMaxSize(UPLOAD_TRACK_CONSTRAINTS.genres.maxCount)
  @IsString({ each: true })
  @MaxLength(UPLOAD_TRACK_CONSTRAINTS.genres.maxLength, { each: true })
  public genres?: string[];
}
