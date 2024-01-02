import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ example: 'Хороший товар' })
  @IsString({ message: 'Заголовк отзыва должно быть строкой' })
  title: string;

  @ApiProperty({ example: 'Моковое описание товара' })
  @IsString({ message: 'Описание отзыва должно быть строкой' })
  description: string;

  @ApiProperty({ example: 4 })
  @IsNumber({}, { message: 'Рейтинг должен быть цифрой' })
  rating: number;
}
