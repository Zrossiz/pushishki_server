export interface IBrandWithLength {
  length: number;
  totalPages: number;
  data: IBrand[];
}

export interface IBrand {
  id: number;
  countryId: number;
  name: string;
  description: string;
  slug: string;
  image: string;
}
