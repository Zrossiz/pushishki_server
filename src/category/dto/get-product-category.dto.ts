import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsString,
} from 'class-validator';

import { Type } from 'class-transformer';

export class GetProductsCategoryDto {
  @IsNotEmpty({ message: 'Слаг категории не может быть пустым значением' })
  @IsString({ message: 'Слаг категории должен быть строкой' })
  slug: string;

  @IsNotEmpty({ message: 'Номер страницы не может быть пустым значением' })
  @IsNumber({}, { message: 'Номер страницы должен быть числом' })
  page: number;

  @IsOptional()
  @IsString({ message: 'Значение сортировки должно быть числом' })
  sort: number;

  @IsOptional()
  @IsNumber({}, { message: 'Минимальная цена должна быть числом' })
  priceFrom: number;

  @IsOptional()
  @IsNumber({}, { message: 'Максимальная цена должна быть числом' })
  priceTo: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IsNumber)
  brands: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IsNumber)
  countries: number[];

  @IsOptional()
  @IsBoolean({ message: 'Наличие должно быть булевым значением' })
  inStock: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Максимальная нагрузка должна быть числом' })
  maximumLoad: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IsNumber)
  age: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IsNumber)
  voltage: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IsNumber)
  drive: number[];
}
