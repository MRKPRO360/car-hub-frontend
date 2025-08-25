import DemographicCard from '../../../components/user/stats/DemographicCard';
import EcommerceMetrics from '../../../components/user/stats/EcommerceMetrics';
import MonthlySalesChart from '../../../components/user/stats/MonthlySalesChart';
import MonthlyTarget from '../../../components/user/stats/MonthlyTarget';
import RecentOrders from '../../../components/user/stats/RecentOrders';
import StatisticsChart from '../../../components/user/stats/StatisticsChart';
import PageMeta from '../../shared/PageMeta';

export default function UserStats() {
  return (
    <>
      <PageMeta
        title="Car Hub | Digital Solution"
        description="A trustworthy platform where you can get your wished car in your budget. Giving you the highest preference of your day to day life."
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
