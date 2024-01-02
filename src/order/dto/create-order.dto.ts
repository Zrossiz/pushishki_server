import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'Иван' })
  @IsNotEmpty({ message: 'Имя не может быть пустым значением' })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @ApiProperty({ example: 'Иванов' })
  @IsNotEmpty({ message: 'Фамилия не может быть пустым значением' })
  @IsString({ message: 'Фамилия должна быть строкой' })
  lastname: string;

  @ApiProperty({ example: 'Иванович' })
  @IsNotEmpty({ message: 'Отчество не может быть пустым значением' })
  @IsString({ message: 'Отчество должно быть строкой' })
  secondname: string;

  @ApiProperty({ example: '+79998887766' })
  @IsNotEmpty({ message: 'Номер не может быть пустым значением' })
  @IsString({ message: 'Номер телефона должен быть строкой' })
  @IsPhoneNumber('RU', {
    message: 'Номер телефона должен начинаться с +7 или 8',
  })
  phone: string;

  @ApiProperty({ example: '20000' })
  @IsNotEmpty({ message: 'Стоимость не может быть пустым значением' })
  @IsNumber({}, { message: 'Стоимость должна быть числовым значением' })
  price: number;
}
