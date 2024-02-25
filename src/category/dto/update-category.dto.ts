import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Толокары',
    description: 'Заголовок категории',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Моковое описание категории',
    description: 'Описание категории',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 'example.png', description: 'Превью категории' })
  @IsString()
  image: string;

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
