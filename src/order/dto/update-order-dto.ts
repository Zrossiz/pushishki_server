import { IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  secondname: string;

  @IsString()
  phone: string;

  @IsNumber()
  price: number;
}
