import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductVariantDto {
  @ApiProperty({ example: '1', description: 'Id товара' })
  @IsNotEmpty({ message: 'Id товара не может быть пустым значением' })
  @IsNumber({}, { message: 'Id товара должно быть числом' })
  productId: number;

  @ApiProperty({ example: '1', description: 'Id цвета' })
  @IsNotEmpty({ message: 'Id цвета не может быть пустым значением' })
  @IsNumber({}, { message: 'Id цвета должно быть числом' })
  colorId: number;

  @ApiProperty({
    example: 'Моковое описание товара',
    description: 'Описание товара',
  })
  @IsNotEmpty({ message: 'Описание не может быть пустым значением' })
  @IsString({ message: 'Описание товара должно быть строкой' })
  description: string;

  @ApiProperty({ example: '123УР123', description: 'Артикул товара' })
  @IsOptional()
  @IsString({ message: 'Артикул должен быть строкой' })
  articul: string;

  @ApiProperty({
    example: '2шт*12v/35w/7000 об',
    description: 'Редуктор электромобиля',
  })
  @IsOptional()
  @IsString({ message: 'Редуктор должен быть строкой' })
  gearbox: string;

  @ApiProperty({ example: '12v/7ah', description: 'Аккумулятор' })
  @IsOptional()
  @IsString({ message: 'Батарея должна быть строкой' })
  battery: string;

  @ApiProperty({ example: '30', description: 'Максимальная нагрузка в КГ' })
  @IsOptional()
  @IsNumber({}, { message: 'Максимальная нагрузка должна быть числом' })
  maximumLoad: number;

  @ApiProperty({
    example: '246*66*84 см, вес: 27,8 кг',
    description: 'Размер собранного товара',
  })
  @IsOptional()
  @IsString({ message: 'Размер товара должен быть строкой' })
  assembledModelSize: string;

  @ApiProperty({
    example: '124*56*53 см, вес: 32 кг, Объём 0,36 м3',
    description: 'Размер товара в упаковке',
  })
  @IsOptional()
  @IsString({ message: 'Размер товара в упаковке должен быть строкой' })
  modelSizeInPackage: string;

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=M6tVC3MwbR0',
    description: 'Ссылка на ютуб видео',
  })
  @IsOptional()
  @IsString({ message: 'Ссылка на видео должно быть строкой' })
  video: string;

  @ApiProperty({ example: '10000', description: 'Стоимость варианта товара' })
  @IsNotEmpty({ message: 'Цена не может быть пустым значением' })
  @IsNumber({}, { message: 'Цена товара должна быть числом' })
  price: number;

  @ApiProperty({
    example: ['example.png'],
    description: 'Массив изображений варинта продукта',
  })
  @IsNotEmpty({ message: 'Изображения не могут быть пустым значением' })
  images: string[];
}
