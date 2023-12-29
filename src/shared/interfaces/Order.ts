import { Order } from '@prisma/client';

export interface IOrderWithLength {
  length: number;
  totalPages: number;
  data: Order[];
}
