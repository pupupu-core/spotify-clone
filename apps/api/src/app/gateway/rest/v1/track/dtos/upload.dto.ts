import { ApiProperty } from '@nestjs/swagger';
import { UPLOAD_TRACK_CONSTRAINTS } from '@streaming-service/config';
import { UploadTrackRequest } from '@streaming-service/model';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

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
  @MinLength(UPLOAD_TRACK_CONSTRAINTS.albumName.minLength)
  @MaxLength(UPLOAD_TRACK_CONSTRAINTS.albumName.maxLength)
  @IsOptional()
  public albumName?: string;

  @ApiProperty({ example: true })
  public isSingle: boolean;

  @ApiProperty({ example: false })
  public isPrivate: boolean;
}
