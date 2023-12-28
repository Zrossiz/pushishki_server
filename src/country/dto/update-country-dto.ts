import { IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  title: string;

  @IsString()
  image: string;
}
