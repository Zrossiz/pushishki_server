import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPhoneNumber, IsString, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ example: 'Иван' })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @ApiProperty({ example: 'Иванов' })
  @IsOptional()
  @IsString({ message: 'Фамилия должна быть строкой' })
  lastname: string;

  @ApiProperty({ example: '+79998887766' })
  @IsOptional()
  @IsString({ message: 'Номер телефона должен быть строкой' })
  @IsPhoneNumber('RU', { message: 'Неверный формат номера телефона' })
  phone: string;

  @ApiProperty({ example: 'г. Москва, Алма-Атинска д8' })
  @IsOptional()
  @IsString({ message: 'Адрес должен быть строкой' })
  address: string;

  @ApiProperty({ example: '20000' })
  @IsOptional()
  @IsNumber({}, { message: 'Стоимость должна быть числовым значением' })
  price: number;
}
