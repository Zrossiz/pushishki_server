export interface IOrder {
  id: number;
  name: string;
  lastname: string;
  secondname: string;
  phone: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderWithLength {
  length: number;
  totalPages: number;
  data: IOrder[];
}
