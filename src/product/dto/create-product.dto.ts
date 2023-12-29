import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  @IsNotEmpty()
  @IsNumber()
  countryId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  articul: number;

  @IsNotEmpty()
  @IsString()
  gearbox: string;

  @IsNotEmpty()
  @IsString()
  battery: string;

  @IsNotEmpty()
  @IsString()
  maximumLoad: number;

  @IsNotEmpty()
  @IsString()
  assembledModelSize: string;

  @IsNotEmpty()
  @IsString()
  modelSizeInPackage: string;

  @IsNotEmpty()
  @IsString()
  video: string;

  @IsNotEmpty()
  @IsString()
  preview: string;

  @IsNotEmpty()
  @IsBoolean()
  bestseller: boolean;

  @IsNotEmpty()
  @IsBoolean()
  new: boolean;

  @IsNotEmpty()
  @IsNumber()
  defaultPrice: number;
}
