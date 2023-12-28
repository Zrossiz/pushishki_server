import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  categoryId: number;

  @IsNumber()
  brandId: number;

  @IsNumber()
  countryId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  articul: number;

  @IsString()
  gearbox: string;

  @IsNotEmpty()
  @IsString()
  battery: string;

  @IsString()
  maximumLoad: number;

  @IsString()
  assembledModelSize: string;

  @IsString()
  modelSizeInPackage: string;

  @IsString()
  video: string;

  @IsNotEmpty()
  @IsString()
  preview: string;

  @IsBoolean()
  bestseller: boolean;

  @IsBoolean()
  new: boolean;

  @IsBoolean()
  inStock: boolean;

  @IsNumber()
  defaultPrice: number;
}
