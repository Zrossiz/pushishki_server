export interface IReview {
  id: number;
  productId: number;
  userId: number;
  title: string;
  description: string;
  rating: number;
}

export interface IReviewWithLength {
  length: number;
  totalPages: number;
  data: IReview[];
}
