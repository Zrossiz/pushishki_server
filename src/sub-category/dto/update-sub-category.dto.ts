import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSubCategoryDto {
  @ApiProperty({ example: 'От 2 до 6' })
  @IsNotEmpty({ message: 'Название категории не может быть пустым' })
  @IsString({ message: 'Название категории должно быть строкой' })
  name: string;
}
