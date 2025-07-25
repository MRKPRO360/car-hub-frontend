export interface IUser {
  _id: string;
  userID: string;
  name: string;
  email: string;
  role: string;
  profileImg: string;
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
