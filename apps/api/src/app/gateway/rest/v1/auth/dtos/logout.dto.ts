import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    example: 'refreshToken',
  })
  @IsNotEmpty()
  public refreshToken: string;
}
