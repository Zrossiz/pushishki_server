export interface ICountryWithLength {
  length: number;
  totalPages: number;
  data: ICountry[];
}

export interface ICountry {
  id: number;
  name: string;
  description: string;
  slug: string;
  image: string;
}
