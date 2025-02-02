import { Outlet } from 'react-router';
import Sidebar from '../../pages/shared/Sidebar';
import adminNavItems from '../../routes/adminRoutes';

function AdminLayout() {
  return (
    <div className="flex flex-col">
      <Sidebar items={adminNavItems} />
      <div className="md:ml-48 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
