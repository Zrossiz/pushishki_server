import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'Id категории должно быть числом' })
  categoryId: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'Id бренда должно быть числом' })
  brandId: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'Id страны должно быть числом' })
  countryId: number;

  @ApiProperty({ example: 'Моковое описание товара' })
  @IsOptional()
  @IsString({ message: 'Название товара должно быть строкой' })
  name: string;

  @ApiProperty({ example: 'Моковое описание товара' })
  @IsOptional()
  @IsString({ message: 'Описание товара должно быть строкой' })
  description: string;

  @ApiProperty({ example: '123оОЛУ' })
  @IsOptional()
  @IsString({ message: 'Артикул должен быть строкой' })
  articul: string;

  @ApiProperty({ example: '2шт*12v/35w/7000 об' })
  @IsOptional()
  @IsString({ message: 'Редуктор должен быть строкой' })
  gearbox: string;

  @ApiProperty({ example: '12v/7ah' })
  @IsOptional()
  @IsString({ message: 'Баттарея должна быть строкой' })
  battery: string;

  @ApiProperty({ example: 30 })
  @IsOptional()
  @IsNumber({}, { message: 'Максимальная нагрузка должна быть числом' })
  maximumLoad: number;

  @ApiProperty({ example: '246*66*84 см, вес: 27,8 кг' })
  @IsOptional()
  @IsString({ message: 'Размер собранной модели должен быть строкой' })
  assembledModelSize: string;

  @ApiProperty({ example: '124*56*53 см, вес: 32 кг, Объём 0,36 м3' })
  @IsOptional()
  @IsString({ message: 'Размер модели в упаковке должен быть строкой' })
  modelSizeInPackage: string;

  @ApiProperty({ example: 'https://www.youtube.com/watch?v=M6tVC3MwbR0' })
  @IsOptional()
  @IsString({ message: 'Ссылка на видео должна быть строкой' })
  video: string;

  @ApiProperty({ example: 'example.png' })
  @IsOptional()
  @IsString({ message: 'Ссылка на изображение должно быть строкой' })
  image: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean({ message: 'Бестселлер должен быть булевым значением' })
  bestseller: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  new: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean({ message: 'В наличии должно быть булевым значением' })
  inStock: boolean;

  @ApiProperty({ example: 10000 })
  @IsOptional()
  @IsNumber({}, { message: 'Значение цены по умолчанию должно быть числом' })
  defaultPrice: number;
}
