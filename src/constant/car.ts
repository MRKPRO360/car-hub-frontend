import { TCondition, TFuelType, TTransmission } from '../types';

export const categoryOptions = [
  { value: 'Sedan', label: 'Sedan' },
  { value: 'SUV', label: 'SUV' },
  { value: 'Truck', label: 'Truck' },
  { value: 'Coupe', label: 'Coupe' },
  { value: 'Convertible', label: 'Convertible' },
];

export const brandOptions = [
  { value: 'BMW', label: 'BMW' },
  { value: 'Ford', label: 'Ford' },
  { value: 'Audi', label: 'Audi' },
  { value: 'Tesla', label: 'Tesla' },
  { value: 'Tata', label: 'Tata' },
  { value: 'Mahindra', label: 'Mahindra' },
  { value: 'Hyundai', label: 'Hyundai' },
];

export const fuelTypeOptions: TFuelType[] = [
  'Petrol',
  'Diesel',
  'Electric',
  'Hybrid',
  'CNG',
  'LPG',
];

export const transmissionOptions: TTransmission[] = ['Automatic', 'Manual'];

export const conditionOptions: TCondition[] = [
  'New',
  'Used',
  'Certified Pre-Owned',
];
