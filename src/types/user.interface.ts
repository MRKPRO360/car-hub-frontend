export interface IUser {
  _id: string;
  userID: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profileImg: string | File[];
  phone: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isPasswordChangedAt: boolean;
  address: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
