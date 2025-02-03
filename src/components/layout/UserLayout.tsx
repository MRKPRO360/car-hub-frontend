import { Outlet } from 'react-router';
import Sidebar from '../../pages/shared/Sidebar';
import userNavItems from '../../routes/userRoutes';

function UserLayout() {
  return (
    <div className="flex flex-col">
      <Sidebar items={userNavItems} />
      <div className="md:ml-48 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
