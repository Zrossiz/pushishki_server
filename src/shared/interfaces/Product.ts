import { Country, Brand, Category } from '@prisma/client';

export interface IProductWithLength {
  length: number;
  totalPages: number;
  data: IProduct[];
}

export interface IProduct {
  id: number;
  country: Country;
  brand: Brand;
  category: Category;
  name: string;
  description: string;
  articul: string;
  gearbox: string;
  battery: string;
  maximumLoad: number;
  assembledModelSize: string;
  modelSizeInPackage: string;
  video: string;
  inStock: boolean;
  image?: string;
  defaultPrice: number;
  metaTitle: string;
  metaDescription: string;
  metaKeyWords: string;
  characteristics?: string;
  slug: string;
}
