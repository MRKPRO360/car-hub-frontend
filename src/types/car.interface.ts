import { IUser } from './user.interface';

export type TFuelType =
  | 'Petrol'
  | 'Diesel'
  | 'Electric'
  | 'Hybrid'
  | 'CNG'
  | 'LPG';

export type TCategory = 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';

export type TTransmission = 'Automatic' | 'Manual';

export type TCondition = 'New' | 'Used' | 'Certified Pre-Owned';

export interface ICar {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: TCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  coverImage: File[];
  images: File[];
  author: IUser;
  ratingAverage: number;
  ratingQuantity: number;
  mileage: number; // in kilometers or miles
  fuelType: TFuelType;
  transmission: TTransmission;
  color?: string;
  engine?: string; // e.g., "2.0L V4", "Dual Motor", etc.
  horsepower?: number;
  torque?: number; // in Nm or lb-ft
  seatingCapacity?: number;
  features?: string[]; // e.g., ['Bluetooth', 'Sunroof']
  vin?: string;
  condition?: TCondition;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  views?: number;
}

export interface ICarFilters {
  brand?: string[];
  model?: string[];
  year?: [number, number];
  price?: [number, number];
  category?: string[];
  fuelType?: string[];
  transmission?: string[];
  condition?: string[];
  color?: string[];
  seatingCapacity?: number[];
  location?: string[];
  searchTerm?: string;
}
