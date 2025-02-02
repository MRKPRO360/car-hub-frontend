import { ICar } from './car.interface';
import { IUser } from './user.interface';

export interface User {
  _id: string;
  name: string;
  email: string;
}
export interface IOrder {
  transaction: {
    id: string;
    transactionStatus: any;
    bank_status: string;
    date_time: string;
    method: string;
    sp_code: string;
    sp_message: string;
  };
  _id: string;
  cars: ICar[];
  user: IUser;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
