import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ example: 'Китай' })
  @IsNotEmpty({ message: 'Название страны не может быть пустым' })
  @IsString({ message: 'Название страны должно быть строкой' })
  name: string;

  @ApiProperty({ example: 'Моковое описание страны' })
  @IsNotEmpty({ message: 'Описание страны не может быть пустым' })
  @IsString({ message: 'Описание страны должно быть строкой' })
  description: string;

  @ApiProperty({ example: 'example.png' })
  @IsNotEmpty({ message: 'Изображение страны не может быть пустым' })
  @IsString({ message: 'Изображение страны должно быть строкой' })
  image: string;
}
