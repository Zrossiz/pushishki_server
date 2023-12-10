import { Brand } from '@prisma/client';

export interface IBrandWithLength {
  length: number;
  data: Brand[];
}
