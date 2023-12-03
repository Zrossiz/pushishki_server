export interface ICategory {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ICategoryWithLength {
  length: number;
  data: ICategory[];
}
