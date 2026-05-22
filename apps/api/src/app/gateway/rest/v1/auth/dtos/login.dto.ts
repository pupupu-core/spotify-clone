import { ApiProperty } from '@nestjs/swagger';
import { AUTH_CONSTRAINTS } from '@streaming-service/config';
import { LoginRequest } from '@streaming-service/model';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto implements LoginRequest {
  @ApiProperty({
    example: 'user@mail.com',
  })
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @MinLength(AUTH_CONSTRAINTS.password.minLength)
  public password: string;
}
