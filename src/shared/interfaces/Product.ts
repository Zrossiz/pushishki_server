export interface IProductWithLength {
  length: number;
  totalPages: number;
  data: IProduct[];
}

export interface IProduct {
  id: number;
  countryId: number;
  brandId: number;
  categoryId: number;
  name: string;
  description: string;
  articul: string;
  gearbox: string;
  battery: string;
  maximumLoad: number;
  assembledModelSize: string;
  modelSizeInPackage: string;
  video: string;
  image: string;
  bestseller: boolean;
  new: boolean;
  inStock: boolean;
  defaultPrice: number;
}
