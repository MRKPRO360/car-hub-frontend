import { Outlet } from 'react-router';
import Footer from '../../pages/shared/Footer';
import Navbar from '../../pages/shared/Navbar';

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1536px] mx-auto px-2 my-18">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
