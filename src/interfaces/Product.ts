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
  articul: string;
  gearbox: string;
  battery: string;
  maximumLoad: string;
  assembledModelSize: string;
  modelSizeInPackage: string;
  video: string;
  preview: string;
  bestseller: boolean;
  new: boolean;
  categorySlug: string;
}
