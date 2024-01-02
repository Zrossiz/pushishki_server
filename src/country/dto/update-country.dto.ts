import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @ApiProperty({ example: 'Китай' })
  @IsOptional()
  @IsString({ message: 'Название страны должно быть строкой' })
  name: string;

  @ApiProperty({ example: 'Моковое описание страны' })
  @IsOptional()
  @IsString({ message: 'Описание страны должно быть строкой' })
  description: string;

  @ApiProperty({ example: 'example.png' })
  @IsOptional()
  @IsString({ message: 'Изображение страны должно быть строкой' })
  image: string;
}
