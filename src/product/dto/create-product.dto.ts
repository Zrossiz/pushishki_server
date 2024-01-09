import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Id страны не может быть пустым значением' })
  @IsNumber({}, { message: 'Id страны должно быть числом' })
  countryId: number;

  @IsNotEmpty({ message: 'Id бренда не может быть пустым значением' })
  @IsNumber({}, { message: 'Id бренда должно быть числом' })
  brandId: number;

  @IsNotEmpty({ message: 'Id категории не может быть пустым значением' })
  @IsNumber({}, { message: 'Id категории должно быть числом' })
  categoryId: number;

  @IsNotEmpty({ message: 'Название товара не может быть пустым значением' })
  @IsString({ message: 'Название товара должно быть строкой' })
  name: string;

  @IsNotEmpty({ message: 'Описание товара не может быть пустым значением' })
  @IsString({ message: 'Описание товара должно быть строкой' })
  description: string;

  @IsNotEmpty({ message: 'Артикул товара не может быть пустым значением' })
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

  @IsNotEmpty({ message: 'Бестселлера не может быть пустым' })
  @IsBoolean({ message: 'Бестселлер должен быть булевым значением' })
  bestseller: boolean;

  @IsNotEmpty({ message: 'Новинка не может быть пустым значением' })
  @IsBoolean({ message: 'Новинка должна быть булевым значением' })
  new: boolean;

  @IsNotEmpty({ message: 'Цена по умолчанию не может быть пустым значением' })
  @IsNumber({}, { message: 'Значение цены по умолчанию должно быть числом' })
  defaultPrice: number;
}
