import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductVariantDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsString()
  colorId: number;

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
  @IsNumber()
  price: number;

  @IsNotEmpty()
  images: string[];
}
