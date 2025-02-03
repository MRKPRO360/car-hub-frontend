import { IUser } from './user.interface';

export interface ICar {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  img: string;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  author: IUser;
}
