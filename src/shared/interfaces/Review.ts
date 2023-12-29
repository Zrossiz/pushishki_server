import { Review } from '@prisma/client';

export interface IReviewWithLength {
  length: number;
  totalPages: number;
  data: Review[];
}
