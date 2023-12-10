import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
