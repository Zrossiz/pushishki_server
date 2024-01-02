export interface IReviewWithLength {
  length: number;
  totalPages: number;
  data: IReview[];
}

export interface IReview {
  id: number;
  productId: number;
  username: string;
  title: string;
  description: string;
  rating: number;
  active: boolean;
}
