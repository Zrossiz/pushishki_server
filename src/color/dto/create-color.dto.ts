import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ example: 'red' })
  @IsOptional()
  @IsString({ message: 'Название цвета должно быть строкой' })
  color: string;

  @ApiProperty({ example: 'Красный' })
  @IsString({ message: 'Заголовок для цвета должно быть строкой' })
  title: string;

  @ApiProperty({ example: "color.png" })
  @IsOptional()
  @IsString({message: 'Изображения должно быть строкой' })
  image: string;
}
