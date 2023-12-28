import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateProductVariantDto {
  @IsNumber()
  colorId: number;

  @IsString()
  description: string;

  @IsString()
  articul: number;

  @IsString()
  gearbox: string;

  @IsString()
  battery: string;

  @IsString()
  maximumLoad: number;

  @IsString()
  assembledModelSize: string;

  @IsString()
  modelSizeInPackage: string;

  @IsArray()
  images: string[];

  @IsString()
  video: string;
}
