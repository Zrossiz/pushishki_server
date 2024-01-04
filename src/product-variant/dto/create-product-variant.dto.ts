import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNotEmpty({ message: 'Артикул не может быть пустым значением' })
  @IsString({ message: 'Акртикул должен быть строкой' })
  articul: number;

  @ApiProperty({
    example: '2шт*12v/35w/7000 об',
    description: 'Редуктор электромобиля',
  })
  @IsNotEmpty({ message: 'Редуктор не может быть пустым значением' })
  @IsString({ message: 'Редуктор должен быть строкой' })
  gearbox: string;

  @ApiProperty({ example: '12v/7ah', description: 'Аккумулятор' })
  @IsNotEmpty({ message: 'Батарея не может быть пустым значением' })
  @IsString({ message: 'Батарея должна быть строкой' })
  battery: string;

  @ApiProperty({ example: '30', description: 'Максимальная нагрузка в КГ' })
  @IsNotEmpty({
    message: 'Максимальная нагрузка не может быть пустым значением',
  })
  @IsNumber({}, { message: 'Максимальная нагрузка должна быть числом' })
  maximumLoad: number;

  @ApiProperty({
    example: '246*66*84 см, вес: 27,8 кг',
    description: 'Размер собранного товара',
  })
  @IsNotEmpty({ message: 'Размер товара не может быть пустым значением' })
  @IsString({ message: 'Размер товара должен быть строкой' })
  assembledModelSize: string;

  @ApiProperty({
    example: '124*56*53 см, вес: 32 кг, Объём 0,36 м3',
    description: 'Размер товара в упаковке',
  })
  @IsNotEmpty({
    message: 'Размер товара в упаковке не может быть пустым значением',
  })
  @IsString({ message: 'Размер товара в упаковке должен быть строкой' })
  modelSizeInPackage: string;

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=M6tVC3MwbR0',
    description: 'Ссылка на ютуб видео',
  })
  @IsNotEmpty({ message: 'Видео не может быть пустым значением' })
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
