import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateBasketDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BasketDto)
  objects: BasketDto[];
}

export class BasketDto {
  @ApiProperty({ example: '1', description: 'Id продукта' })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({ example: '1', description: 'Id варианта продукта' })
  @IsNotEmpty()
  @IsNumber()
  variantId: number;

  @ApiProperty({ example: '1', description: 'Id заказа' })
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: 'Иван', description: 'Имя заказчика' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия заказчика' })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество заказчика' })
  @IsNotEmpty()
  @IsString()
  secondname: string;

  @ApiProperty({ example: '+79996305009', description: 'Телефон заказчика' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 10, description: 'Количество товара данной позиции' })
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @ApiProperty({ example: '10000', description: 'Стоимость данной позиции' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
