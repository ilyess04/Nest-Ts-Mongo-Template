import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @ApiProperty()
  name: string;
}
