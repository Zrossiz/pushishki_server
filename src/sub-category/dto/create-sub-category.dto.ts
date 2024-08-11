import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty({ example: 'От 2 до 6' })
  @IsNotEmpty({ message: 'Название категории не может быть пустым' })
  @IsString({ message: 'Название категории должно быть строкой' })
  name: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Ключ категории не может быть пустым' })
  @IsNumber({}, { message: 'Ключ категории должен быть числом' })
  categoryId: number;

  @ApiProperty({
    example: 'Название категории',
    description: 'Meta title for category',
  })
  @IsOptional()
  @IsString()
  metaTitle: string;

  @ApiProperty({
    example: 'Описание категории',
    description: 'Meta description for category',
  })
  @IsOptional()
  @IsString()
  metaDescription: string;

  @ApiProperty({
    example: 'Ключевые слова категории',
    description: 'Meta key words for category',
  })
  @IsOptional()
  @IsString()
  metaKeyWords: string;
}
