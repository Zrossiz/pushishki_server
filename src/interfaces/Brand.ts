export interface IBrand {
  id: number;
  countryId: number;
  title: string;
  image: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IBrandWithLength {
  length: number;
  data: IBrand[];
}
