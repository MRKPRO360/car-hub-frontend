import UserOrdersTable from './UserOrdersTable';
import PageBreadcrumb from '../../shared/PageBreadCrumb';
import PageMeta from '../../shared/PageMeta';

export default function MyOrders() {
  return (
    <>
      <PageMeta
        title="Car Hub | Digital Solution"
        description="A trustworthy platform where you can get your wished car in your budget. Giving you the highest preference of your day to day life."
      />
      <PageBreadcrumb pageTitle="My orders" />
      <div className="space-y-6">
        <UserOrdersTable />
      </div>
    </>
  );
}
