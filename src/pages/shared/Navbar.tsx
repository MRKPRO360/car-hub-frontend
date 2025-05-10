import { FiSearch, FiHeart } from 'react-icons/fi';
import { MdLocalPhone } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import { TbWorld } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  logout,
  selectCurrentToken,
} from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LayoutDashboard, LogOut, User2 } from 'lucide-react';
import Cta from './Cta';
import MobileDrawer from './MobileDrawer';

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
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  let user;

  if (token) {
    user = verifyToken(token);
  }

  return (
    <nav className="sticky top-0 left-0 z-50">
      {/* Mini Top Bar */}
      <div className="bg-primary text-white py-2 px-4 flex justify-between items-center text-[13px]">
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
      <div className="max-w-[1536px] mx-auto   ">
        <div className="bg-white px-4   flex items-center justify-between border-b border-b-gray-300/50">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary py-3">CARHUB</div>

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
          <div className="flex items-center space-x-4 text-blue-700 text-lg ">
            <button className="hover:text-blue-500" aria-label="Search">
              <Link to="/stock">
                <FiSearch />
              </Link>
            </button>
            <button className="hover:text-blue-500" aria-label="Wishlist">
              <FiHeart />
            </button>
            <ul>
              {user?.role ? (
                <div className="relative w-max mx-auto" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown();
                    }}
                    className="px-4 py-2 flex items-center rounded-full text-slate-900 text-sm font-medium border border-slate-300 outline-none hover:bg-slate-100 cursor-pointer"
                  >
                    <img
                      src="https://readymadeui.com/profile_6.webp"
                      className="w-7 h-7 mr-3 rounded-full shrink-0"
                      alt="Profile"
                    />
                    John Doe
                    <ChevronDown
                      className={`w-3 h-3 text-slate-400 inline ml-3 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <ul className="absolute block  bg-white rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 z-[1000] min-w-full w-max  max-h-96 overflow-auto">
                      <li
                        className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-100 text-slate-900 text-sm cursor-pointer"
                        onClick={closeDropdown}
                      >
                        <User2 className="w-4 h-4 mr-3" />
                        View profile
                      </li>
                      <Link
                        to={`${user?.role}/dashboard`}
                        className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-100 text-slate-900 text-sm cursor-pointer"
                        onClick={closeDropdown}
                      >
                        <LayoutDashboard className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      <li
                        className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-100 text-slate-900 text-sm cursor-pointer"
                        onClick={() => {
                          handleLogout();
                          closeDropdown();
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <ul>
                  <NavLink to="/login">
                    <Cta size="sm" text="Login" />
                  </NavLink>
                </ul>
              )}
            </ul>
            {/* <button
              className="hover:text-blue-500 md:hidden "
              aria-label="Menu"
            >
              <FiMenu />
            </button> */}
            <MobileDrawer items={publicNavItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
