import { IsIn, IsNotEmpty, IsNumberString, IsString, IsUUID, ValidateIf } from 'class-validator';

export class PlaylistTrackReferenceDto {
  @IsIn(['jamendo', 'userUpload'])
  public source: 'jamendo' | 'userUpload';

  @ValidateIf(ref => ref.source === 'jamendo')
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  public externalId?: string;

  @ValidateIf(ref => ref.source === 'userUpload')
  @IsUUID()
  public trackId?: string;
}
