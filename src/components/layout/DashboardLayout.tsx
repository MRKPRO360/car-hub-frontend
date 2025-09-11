import { Outlet } from 'react-router';
import { SidebarProvider, useSidebar } from '../../context/SidebarContext';
import AppSidebar from '../CHDashboard/AppSidebar';
import Backdrop from '../CHDashboard/Backdrop';
import AppHeader from '../CHDashboard/AppHeader';
import { useGetMeQuery } from '../../redux/features/user/selfManagement';

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { data: myInfo } = useGetMeQuery(undefined);

  return (
    <div className="xl:flex min-h-screen">
      <div>
        <AppSidebar role={myInfo?.data?.role as 'admin' | 'user'} />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
        } ${isMobileOpen ? 'ml-0' : ''}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default DashboardLayout;
