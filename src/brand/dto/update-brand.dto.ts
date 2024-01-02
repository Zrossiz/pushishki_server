import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBrandDto {
  @ApiProperty({ example: '1', description: 'Id страны' })
  @IsOptional()
  @IsNumber({}, { message: 'Id продукта должно быть числом' })
  countryId: number;

  @ApiProperty({ example: 'River toys', description: 'Название бренда' })
  @IsOptional()
  @IsString({ message: 'Имя бренда должно быть строкой' })
  name: string;

  @ApiProperty({
    example: 'example.png',
    description: 'Название картинки-превью',
  })
  @IsOptional()
  @IsString({ message: 'Название картинки бренда должно быть строкой' })
  image: string;

  @ApiProperty({ example: 'Моковый бренд', description: 'Описание бренда' })
  @IsOptional()
  @IsString({ message: 'Описание бренджа должно быть строкой' })
  description: string;
}
