import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Электромобили', description: 'Category name' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'example.png', description: 'Category name' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    example: 'Моковое описание категории',
    description: 'Category name',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
