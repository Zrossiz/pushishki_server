import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ example: 'red' })
  @IsString({ message: 'Название цвета должно быть строкой' })
  color: string;

  @ApiProperty({ example: 'Красный' })
  @IsString({ message: 'Заголовок для цвета должно быть строкой' })
  title: string;

  @ApiProperty({ example: "color.png" })
  @IsString({message: 'Название для изображения должно быть строкой' })
  image: string;
}
