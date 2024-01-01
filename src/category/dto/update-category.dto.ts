import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
}
