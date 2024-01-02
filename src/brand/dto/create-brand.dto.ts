import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNotEmpty({ message: 'Картинка бренда не может быть пустым значением' })
  @IsString({ message: 'Название картинки бренда должно быть строкой' })
  image: string;

  @ApiProperty({ example: 'Моковый бренд', description: 'Описание бренда' })
  @IsNotEmpty({ message: 'Описание бренда не может быть пустым' })
  @IsString({ message: 'Описание бренджа должно быть строкой' })
  description: string;
}
