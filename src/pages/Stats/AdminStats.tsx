import DemographicCard from '../../components/admin/stats/DemographicCard';
import EcommerceMetrics from '../../components/admin/stats/EcommerceMetrics';
import MonthlySalesChart from '../../components/admin/stats/MonthlySalesChart';
import MonthlyTarget from '../../components/admin/stats/MonthlyTarget';
import RecentOrders from '../../components/admin/stats/RecentOrders';
import StatisticsChart from '../../components/admin/stats/StatisticsChart';
import PageMeta from '../shared/PageMeta';

export default function AdminStats() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

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
