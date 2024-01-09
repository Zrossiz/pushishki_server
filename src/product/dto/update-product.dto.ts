import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNumber({}, { message: 'Id категории должно быть числом' })
  categoryId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Id бренда должно быть числом' })
  brandId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Id страны должно быть числом' })
  countryId: number;

  @IsOptional()
  @IsString({ message: 'Название товара должно быть строкой' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Описание товара должно быть строкой' })
  description: string;

  @IsOptional()
  @IsString({ message: 'Артикул должен быть строкой' })
  articul: string;

  @IsOptional()
  @IsString({ message: 'Редуктор должен быть строкой' })
  gearbox: string;

  @IsOptional()
  @IsString({ message: 'Баттарея должна быть строкой' })
  battery: string;

  @IsOptional()
  @IsNumber({}, { message: 'Максимальная нагрузка должна быть числом' })
  maximumLoad: number;

  @IsOptional()
  @IsString({ message: 'Размер собранной модели должен быть строкой' })
  assembledModelSize: string;

  @IsOptional()
  @IsString({ message: 'Размер модели в упаковке должен быть строкой' })
  modelSizeInPackage: string;

  @IsOptional()
  @IsString({ message: 'Ссылка на видео должна быть строкой' })
  video: string;

  @IsOptional()
  @IsString({ message: 'Ссылка на изображение должно быть строкой' })
  image: string;

  @IsOptional()
  @IsBoolean({ message: 'Бестселлер должен быть булевым значением' })
  bestseller: boolean;

  @IsOptional()
  @IsBoolean()
  new: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Новинка должна быть булевым значением' })
  inStock: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Значение цены по умолчанию должно быть числом' })
  defaultPrice: number;
}
