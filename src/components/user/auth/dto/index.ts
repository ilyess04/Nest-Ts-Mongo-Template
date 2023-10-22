import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class SendMailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  mail: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  confirmPassword: string;
}
