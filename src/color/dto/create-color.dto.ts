import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ example: 'Красный' })
  @IsNotEmpty({ message: 'Название цвета не может быть пустым значеним' })
  @IsString({ message: 'Название цвета должно быть строкой' })
  color: string;
}
