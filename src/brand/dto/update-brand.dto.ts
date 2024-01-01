import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateBrandDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  countryId: number;

  @ApiProperty({ example: 'River Toys' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'example.png' })
  @IsString()
  image: string;

  @ApiProperty({ example: 'Моковое описание' })
  @IsString()
  description: string;
}
