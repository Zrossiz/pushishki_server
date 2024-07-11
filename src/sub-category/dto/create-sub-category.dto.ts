import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty({ example: 'От 2 до 6' })
  @IsNotEmpty({ message: 'Название категории не может быть пустым' })
  @IsString({ message: 'Название категории должно быть строкой' })
  name: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Ключ категории не может быть пустым' })
  @IsNumber({}, { message: 'Ключ категории должен быть числом' })
  categoryId: number;
}
