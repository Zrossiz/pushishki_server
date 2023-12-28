import { Product } from '@prisma/client';

export interface IProductWithLength {
  length: number;
  totalPages: number;
  data: Product[];
}

export interface ICreateProductData {
  categoryId: number;
  brandId: number;
  countryId: number;
  title: string;
  description: string;
  articul: number;
  gearbox: string;
  battery: string;
  maximumLoad: number;
  assembledModelSize: string;
  modelSizeInPackage: string;
  video: string;
  preview: string;
  bestseller: boolean;
  new: boolean;
  defaultPrice: number;
  categorySlug: string;
  countryName: string;
  brandName: string;
}
