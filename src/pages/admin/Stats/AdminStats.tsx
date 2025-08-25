import DemographicCard from '../../../components/admin/stats/DemographicCard';
import EcommerceMetrics from '../../../components/admin/stats/EcommerceMetrics';
import MonthlySalesChart from '../../../components/admin/stats/MonthlySalesChart';
import MonthlyTarget from '../../../components/admin/stats/MonthlyTarget';
import RecentOrders from '../../../components/admin/stats/RecentOrders';
import StatisticsChart from '../../../components/admin/stats/StatisticsChart';
import { useGetAllOrdersAndCustomersQuery } from '../../../redux/features/admin/orderManagement.api';
import PageMeta from '../../shared/PageMeta';

export default function AdminStats() {
  const { data: ordersAndCustomers } =
    useGetAllOrdersAndCustomersQuery(undefined);

  return (
    <>
      <PageMeta
        title="Car Hub | Digital Solution"
        description="A trustworthy platform where you can get your wished car in your budget. Giving you the highest preference of your day to day life."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics ordersAndCustomers={ordersAndCustomers?.data} />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
