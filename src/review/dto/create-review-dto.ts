import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 'Иван Иванов' })
  @IsNotEmpty({ message: 'Имя пользователя не может быть пустым' })
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @MinLength(3, {
    message: 'Минимальная длина имение пользователя - 3 символа',
  })
  username: string;

  @ApiProperty({ example: 'Хороший товар' })
  @IsNotEmpty({ message: 'Заголовк отзыва не может быть пустым' })
  @IsString({ message: 'Заголовк отзыва должно быть строкой' })
  title: string;

  @ApiProperty({ example: 'Моковое описание товара' })
  @IsNotEmpty({ message: 'Описание отзыва не может быть пустым' })
  @IsString({ message: 'Описание отзыва должно быть строкой' })
  description: string;

  @ApiProperty({ example: 4 })
  @IsNotEmpty({ message: 'Рейтинг отзыва не может быть пустым' })
  @IsNumber({}, { message: 'Рейтинг должен быть цифрой' })
  rating: number;
}
