import { IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  image: string;
}
