import { IOrder } from './order.interface';
import { IUser } from './user.interface';

export type IChartType = 'sales' | 'target' | 'analytics';

export interface IMonthlySales {
  month: string;
  sales: number;
  revenue: number;
  quantity: number;
}

export interface IMonthlyTargetDetails {
  targetAmount: number;
  curRevenue: number;
  todayRevenue: number;
  progressPercentage: number;
  growthPercentage: number;
  isGrowthPositive: boolean;
  message: string;
  additionalStats: {
    curMonthOrders: number;
    remainingAmount: number;
    daysInMonth: number;
    daysPassed: number;
    averageDailyRevenue: number;
  };
}

export interface IMonthlyTargetData {
  data: IMonthlyTargetDetails;
}

export interface ICustomerOrderAnalytics {
  cur: {
    orders: IOrder[];
    customers: IUser[];
  };
  prev: {
    orders: IOrder[];
    customers: IUser[];
  };
  analytics: {
    customerChange: number;
    orderChange: number;
    customerGrowth: 'positive' | 'negative';
    orderGrowth: 'positive' | 'negative';
  };
}

export interface ICountryData {
  country: string;
  customerCount: number;
  percentage?: number;
}
