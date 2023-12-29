import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: '1', description: 'Id страны' })
  @IsNotEmpty()
  @IsString()
  countryId: number;

  @ApiProperty({ example: 'River toys', description: 'Название бренда' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'example.png',
    description: 'Название картинки-превью',
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 'Моковый бренд', description: 'Описание бренда' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
