import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSubCategoryDto {
  @ApiProperty({ example: 'От 2 до 6' })
  @IsOptional()
  @IsString({ message: 'Название категории должно быть строкой' })
  name: string;

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
