import { MdLocalPhone } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import { TbWorld } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentToken } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';

import Cta from './Cta';
import MobileDrawer from './MobileDrawer';
import { ThemeToggleButton } from './ThemeToggleButton';
import UserDropdown from '../../components/CHDashboard/header/UserDropdown';
import { Heart } from 'lucide-react';
import SearchBox from './SearchBox';

const publicNavItems = [
  {
    path: '/',
    text: 'Home',
  },
  {
    path: '/stock',
    text: 'Stock List',
  },
  {
    path: '/works',
    text: 'How it works',
  },
];

const Navbar = () => {
  const token = useAppSelector(selectCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  return (
    <nav className="sticky top-0 left-0 z-50 transition duration-300 ">
      {/* Mini Top Bar */}
      <div className="bg-primary text-white py-2  flex justify-between items-center text-xs xsm:text-[13px] px-4">
        <div className="flex items-center gap-1">
          <TbWorld className="text-lg" />
          <span className="text-[13px]">Language</span>
        </div>
        <div className="flex items center gap-4">
          <div className="flex items-center gap-1">
            <IoMdEye className="text-lg" />
            <span>Recently Viewed</span>
          </div>
          <div className="flex items-center gap-1">
            <MdLocalPhone className="text-lg" />
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>

          {!user?.role && (
            <div className="flex items-center gap-1">
              <FaUser />
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <span>/</span>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1536px] mx-auto bg-white dark:bg-gray-900 dark:text-white">
        <div className="px-2 flex flex-wrap items-center justify-between border-b border-b-gray-300/50 dark:border-b-gray-700">
          {/* Logo */}
          <Link
            to={'/'}
            className="text-2xl font-bold text-primary dark:text-gray-300 py-3 order-1"
          >
            CARHUB
          </Link>

          {/* Main Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium order-2">
            {publicNavItems.map(
              (el: { path: string; text: string }, key: number) => (
                <NavLink
                  key={key}
                  to={el.path}
                  className="relative inline-block 2xsm:text-base lg:text-[15px] hover:text-primary transition duration-300 py-5"
                >
                  {({ isActive }) => (
                    <>
                      {el.text}
                      <span
                        className={`inline-block border-b-[2px] border-primary w-full h-[8px] absolute bottom-0 left-0 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              )
            )}
          </nav>

          {/* Right-side Icons */}
          <div className="flex w-full pb-3 xsm:pb-0 xsm:w-auto items-center space-x-4 text-blue-700 text-lg order-3">
            <SearchBox />
            <ThemeToggleButton isBorder={false} />
            <button
              className="hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
              aria-label="Wishlist"
            >
              <Link to="/wishlist">
                <Heart className="w-5 h-5" />
              </Link>
            </button>
            <ul className="hidden md:block">
              {user?.role ? (
                <UserDropdown isDashboardLink={true} />
              ) : (
                <ul>
                  <NavLink to="/login">
                    <Cta size="sm" text="Login" />
                  </NavLink>
                </ul>
              )}
            </ul>
          </div>
          <MobileDrawer items={publicNavItems} user={user!} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
