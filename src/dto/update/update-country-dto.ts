import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
