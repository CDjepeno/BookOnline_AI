import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  author: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  releaseAt: Date;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  imageUrl: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  approved: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
