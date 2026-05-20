import { ApiProperty } from '@nestjs/swagger';
import { AUTH_CONSTRAINTS } from '@streaming-service/config';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@mail.com',
  })
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @MinLength(AUTH_CONSTRAINTS.password.minLength)
  public password: string;
}
