import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

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

  @ApiProperty({ example: 10, description: 'Количество товара данной позиции' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: '10000', description: 'Стоимость данной позиции' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
