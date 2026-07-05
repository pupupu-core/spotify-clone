import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class AutocompleteQueryDto {
  @ApiProperty({
    description: 'autocompete suggestion prefixes (he... -> hello/hell/hellium)',
    minLength: 2,
    maxLength: 100,
    example: 'rock',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  public query: string;

  @ApiPropertyOptional({
    description: 'how much suggestions are matched per query',
    type: Number,
    minimum: 1,
    maximum: 10,
    default: 5,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  public limit?: number;
}

export class TrackSearchQueryDto {
  @ApiProperty({
    description: 'search by text/track/album/tag',
    minLength: 1,
    maxLength: 100,
    example: 'rock',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public query: string;

  @ApiPropertyOptional({
    description: 'maximum returned tracks',
    type: Number,
    minimum: 1,
    maximum: 100,
    default: 50,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  public limit?: number;
}
