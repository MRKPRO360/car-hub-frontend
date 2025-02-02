export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImg: string;
  phone: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isPasswordChangedAt: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
