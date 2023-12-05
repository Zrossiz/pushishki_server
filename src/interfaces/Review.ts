export interface IReview {
  id: number;
  productId: number;
  name: string;
  title: string;
  description: string;
  rating: number;
}

export interface IReviewWithLength {
  length: number;
  totalPages: number;
  data: IReview[];
}
