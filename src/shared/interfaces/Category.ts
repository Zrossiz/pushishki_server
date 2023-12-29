import { Category } from '@prisma/client';

export interface ICategoryWithLength {
  length: number;
  data: Category[];
}
