import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: '1', description: 'Id страны' })
  @IsNotEmpty({ message: 'Id продукта не может быть пустым значением' })
  @IsNumber({}, { message: 'Id продукта должно быть числом' })
  countryId: number;

  @ApiProperty({ example: 'River toys', description: 'Название бренда' })
  @IsNotEmpty({ message: 'Имя бренда не может быть пустым значением' })
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
