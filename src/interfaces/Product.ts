import { Product } from '@prisma/client';

export interface IProductWithLength {
  length: number;
  totalPages: number;
  data: Product[];
}
