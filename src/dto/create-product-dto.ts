import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  categoryId: number;
  @IsNotEmpty()
  brandId: number;
  @IsNotEmpty()
  countryId: number;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  articul: string;
  @IsNotEmpty()
  gearbox: string;
  @IsNotEmpty()
  battery: string;
  @IsNotEmpty()
  maximumLoad: string;
  @IsNotEmpty()
  assembledModelSize: string;
  @IsNotEmpty()
  modelSizeInPackage: string;
  @IsNotEmpty()
  video: string;
}
