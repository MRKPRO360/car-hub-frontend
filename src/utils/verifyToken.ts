import { jwtDecode } from 'jwt-decode';
import { IUser } from '../types';

export const verifyToken = (token: string): IUser => {
  return jwtDecode(token);
};
