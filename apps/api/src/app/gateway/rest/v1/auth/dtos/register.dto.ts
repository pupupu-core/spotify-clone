import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { AUTH_CONSTRAINTS } from '@streaming-service/config';

export class RegisterDto {
  @ApiProperty({
    example: 'user@mail.com',
  })
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @MinLength(AUTH_CONSTRAINTS.password.minLength)
  public password: string;
}
