import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  description: string;
}
