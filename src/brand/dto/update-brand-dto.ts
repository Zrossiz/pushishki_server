import { IsString, IsNumber } from 'class-validator';

export class UpdateBrandDto {
  @IsNumber()
  countryId: number;

  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  description: string;
}
