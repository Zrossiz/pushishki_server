import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
  @IsNotEmpty({ message: 'Id товара не может быть пустым значением' })
  @IsNumber({}, { message: 'Id товара должно быть числом' })
  productId: number;

  @ApiProperty({ example: 'Красный', description: 'Цвет варианта продукта' })
  @IsOptional()
  @IsString()
  color: string;

  @ApiProperty({ example: '1', description: 'Id заказа' })
  @IsNumber({}, { message: 'Id заказа должно быть числом' })
  orderId: number;

  @ApiProperty({ example: 10, description: 'Количество товара данной позиции' })
  @IsNotEmpty({
    message: 'Количество единиц товара не может быть пустым значением',
  })
  @IsNumber({}, { message: 'Количество единиц товара должно быть числом' })
  quantity: number;

  @ApiProperty({ example: '10000', description: 'Стоимость данной позиции' })
  @IsNotEmpty({ message: 'Стоимость не может быть пустым значением' })
  @IsNumber({}, { message: 'Стоимость должно быть числом' })
  price: number;
}
