import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Электромобили', description: 'Category name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'example.png', description: 'Image link' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    example: 'Моковое описание категории',
    description: 'Category description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: "Название категории",
    description: "Meta title for category"
  })
  @IsOptional()
  @IsString()
  metaTitle: string;

  @ApiProperty({
    example: "Описание категории",
    description: "Meta description for category"
  })
  @IsOptional()
  @IsString()
  metaDescription: string;

  @ApiProperty({
    example: "Ключевые слова категории",
    description: "Meta key words for category"
  })
  @IsOptional()
  @IsString()
  metaKeyWords: string;
}
