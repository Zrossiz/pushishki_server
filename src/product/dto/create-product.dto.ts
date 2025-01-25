import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Id страны не может быть пустым значением' })
  @IsNumber({}, { message: 'Id страны должно быть числом' })
  countryId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Id бренда не может быть пустым значением' })
  @IsNumber({}, { message: 'Id бренда должно быть числом' })
  brandId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Id категории не может быть пустым значением' })
  @IsNumber({}, { message: 'Id категории должно быть числом' })
  categoryId: number;

  @ApiProperty({ example: 'Моковое описание товара' })
  @IsNotEmpty({ message: 'Название товара не может быть пустым значением' })
  @IsString({ message: 'Название товара должно быть строкой' })
  name: string;

  @ApiProperty({ example: 'Моковое описание товара' })
  @IsNotEmpty({ message: 'Описание товара не может быть пустым значением' })
  @IsString({ message: 'Описание товара должно быть строкой' })
  description: string;

  @ApiProperty({ example: 'Моковые характеристики товара' })
  @IsOptional()
  @IsString({ message: 'Характеристики товара должны быть строкой' })
  characteristics: string;

  @ApiProperty({ example: '123оОЛУ' })
  @IsNotEmpty({ message: 'Артикул товара не может быть пустым значением' })
  @IsString({ message: 'Артикул должен быть строкой' })
  articul: string;

  @ApiProperty({ example: '2шт*12v/35w/7000 об' })
  @IsOptional()
  @IsString({ message: '2шт*12v/35w/7000 об' })
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
  @IsNotEmpty({ message: 'Бестселлера не может быть пустым' })
  @IsBoolean({ message: 'Бестселлер должен быть булевым значением' })
  bestseller: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsNotEmpty({ message: 'Новинка не может быть пустым значением' })
  @IsBoolean({ message: 'Новинка должна быть булевым значением' })
  new: boolean;

  @ApiProperty({ example: 10000 })
  @IsNotEmpty({ message: 'Цена по умолчанию не может быть пустым значением' })
  @IsNumber({}, { message: 'Значение цены по умолчанию должно быть числом' })
  defaultPrice: number;

  @ApiProperty({
    example: 'Название товара',
    description: 'Meta title for product',
  })
  @IsOptional()
  @IsString()
  metaTitle: string;

  @ApiProperty({
    example: 'Описание товара',
    description: 'Meta description for product',
  })
  @IsOptional()
  @IsString()
  metaDescription: string;

  @ApiProperty({
    example: 'Ключевые слова товара',
    description: 'Meta key words for product',
  })
  @IsOptional()
  @IsString()
  metaKeyWords: string;

  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на объект вольтажа',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Ключ вольтажа должен быть числом' })
  voltageId: number;

  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на объект возраста',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Ключ возраста должен быть числом' })
  ageId: number;

  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на объект привода',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Ключ на объект привода должен быть числом' })
  driveId: number;

  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на объект производителя',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Внешний ключ на объект производителя должен быть числом' })
  manufacturerId: number;
}
