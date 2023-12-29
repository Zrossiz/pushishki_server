import { Country } from '@prisma/client';

export interface ICountryWithLength {
  length: number;
  data: Country[];
}
