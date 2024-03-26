import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ example: 'Хороший товар' })
  @IsOptional()
  @IsString({ message: 'Заголовк отзыва должно быть строкой' })
  title: string;

  @ApiProperty({ example: 'Моковое описание товара' })
  @IsOptional()
  @IsString({ message: 'Описание отзыва должно быть строкой' })
  description: string;

  @ApiProperty({ example: 4 })
  @IsOptional()
  @IsNumber({}, { message: 'Рейтинг должен быть цифрой' })
  rating: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  active: boolean;
}
