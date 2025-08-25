import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import PageBreadcrumb from '../shared/PageBreadCrumb';
import PageMeta from '../shared/PageMeta';

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Car Hub | Digital Solution"
        description="A trustworthy platform where you can get your wished car in your budget. Giving you the highest preference of your day to day life."
      />
      <PageBreadcrumb pageTitle="My orders" />
      <div className="space-y-6">
        <BasicTableOne />
      </div>
    </>
  );
}
