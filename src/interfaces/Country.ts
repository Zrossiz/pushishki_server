export interface ICountry {
  id: number;
  title: string;
  slug: string;
  image: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ICountryWithLength {
  length: number;
  data: ICountry[];
}
