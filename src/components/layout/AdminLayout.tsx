import { Outlet } from 'react-router';
import Sidebar from '../../pages/shared/Sidebar';
import adminNavItems from '../../routes/adminRoutes';

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar items={adminNavItems} />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
