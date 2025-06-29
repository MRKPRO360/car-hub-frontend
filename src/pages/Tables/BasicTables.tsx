import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne';
import PageBreadcrumb from '../shared/PageBreadCrumb';
import PageMeta from '../shared/PageMeta';

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="My orders" />
      <div className="space-y-6">
        <BasicTableOne />
      </div>
    </>
  );
}
