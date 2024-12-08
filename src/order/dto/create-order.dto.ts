import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateBasketDto } from 'src/basket/dto/create-basket.dto';

export class CreateOrderDto {
  @ApiProperty({ example: 'Иван' })
  @IsNotEmpty({ message: 'Имя не может быть пустым значением' })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @ApiProperty({ example: 'Иванов' })
  @IsNotEmpty({ message: 'Фамилия не может быть пустым значением' })
  @IsString({ message: 'Фамилия должна быть строкой' })
  lastname: string;

  @ApiProperty({ example: '+79998887766' })
  @IsNotEmpty({ message: 'Номер не может быть пустым значением' })
  @IsString({ message: 'Номер телефона должен быть строкой' })
  phone: string;

  @ApiProperty({ example: 'г. Москва, Алма-Атинска д8' })
  @IsOptional()
  @IsString({ message: 'Адрес должен быть строкой' })
  address: string;

  @ApiProperty({ example: '20000' })
  @IsNotEmpty({ message: 'Стоимость не может быть пустым значением' })
  @IsNumber({}, { message: 'Стоимость должна быть числовым значением' })
  price: number;

  basket: CreateBasketDto
}
