export interface IProduct {
  id: number;
  title: string;
  description: string;
  articul: string;
  gearbox: string;
  battery: string;
  assembledModelSize: string;
  modelSizeInPackage: string;
  video: string;
  preview: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IProductWithLength {
  length: number;
  data: IProduct[];
}
