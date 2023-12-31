import { IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  name: string;

  @IsString()
  image: string;
}
