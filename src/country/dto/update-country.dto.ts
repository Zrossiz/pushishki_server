import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCountryDto {
  @ApiProperty({ example: 'Китай' })
  @IsString({ message: 'Название страны должно быть строкой' })
  name: string;

  @ApiProperty({ example: 'Моковое описание страны' })
  @IsString({ message: 'Описание страны должно быть строкой' })
  description: string;

  @ApiProperty({ example: 'example.png' })
  @IsString({ message: 'Изображение страны должно быть строкой' })
  image: string;
}
