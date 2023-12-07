import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductVariantDto {
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
  color: string;

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  @IsString()
  video: string;
}
