import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
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
  articul: string;

  @IsNotEmpty()
  @IsString()
  gearbox: string;

  @IsNotEmpty()
  @IsString()
  battery: string;

  @IsNotEmpty()
  @IsString()
  maximumLoad: string;

  @IsNotEmpty()
  @IsString()
  assembledModelSize: string;

  @IsNotEmpty()
  @IsString()
  modelSizeInPackage: string;

  @IsNotEmpty()
  @IsString()
  video: string;
}
