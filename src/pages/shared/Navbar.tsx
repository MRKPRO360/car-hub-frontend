import { FiSearch, FiHeart } from 'react-icons/fi';
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
      <div className="bg-primary  text-white py-2 px-4 flex justify-between items-center text-[13px]">
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
      <div className="max-w-[1536px] mx-auto">
        <div className="bg-white dark:bg-gray-900 px-4 dark:text-white flex items-center justify-between border-b border-b-gray-300/50">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary dark:text-gray-300 py-3">
            CARHUB
          </div>

          {/* Main Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {publicNavItems.map(
              (el: { path: string; text: string }, key: number) => (
                <NavLink
                  key={key}
                  to={el.path}
                  className="relative inline-block hover:text-primary transition py-5"
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
          <div className="flex items-center space-x-4 text-blue-700 text-lg">
            <ThemeToggleButton isBorder={false} />
            <button
              className="hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
              aria-label="Search"
            >
              <Link to="/stock">
                <FiSearch />
              </Link>
            </button>
            <button
              className="hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
              aria-label="Wishlist"
            >
              <FiHeart />
            </button>
            <ul>
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

            <MobileDrawer items={publicNavItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
