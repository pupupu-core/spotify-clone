import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsStrongPassword, MinLength } from 'class-validator';
import { AUTH_CONSTRAINTS } from '@streaming-service/config';
import { RegisterRequest } from '@streaming-service/model';

export class RegisterDto implements RegisterRequest {
  @ApiProperty({
    example: 'user@mail.com',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: '1Qwe-rty',
  })
  @IsStrongPassword({
    minLength: AUTH_CONSTRAINTS.password.minLength,
    minLowercase: AUTH_CONSTRAINTS.password.minLowercase,
    minUppercase: AUTH_CONSTRAINTS.password.minUppercase,
    minNumbers: AUTH_CONSTRAINTS.password.minNumbers,
    minSymbols: AUTH_CONSTRAINTS.password.minSymbols,
  })
  public password: string;

  @ApiProperty({
    required: false,
    example: 'notlogin',
  })
  @IsOptional()
  @MinLength(AUTH_CONSTRAINTS.username.minLength)
  public username?: string;
}
