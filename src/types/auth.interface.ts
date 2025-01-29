import { IUser } from './index';

export interface IAuthState {
  user: null | IUser;
  token: string | null;
}
