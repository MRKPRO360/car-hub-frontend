import { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  logout,
  selectCurrentToken,
} from '../../../redux/features/auth/authSlice';
import { verifyToken } from '../../../utils/verifyToken';
import { ChevronDown, LayoutDashboard, LogOut, User2 } from 'lucide-react';
interface IUserDropDown {
  isDashboardLink?: boolean;
}
export default function UserDropdown({
  isDashboardLink = true,
}: IUserDropDown) {
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
    <div className="relative " ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
        className="px-4 py-2 flex items-center rounded-full text-slate-900 text-sm font-medium outline-none transition duration-300  cursor-pointer dark:text-white"
      >
        <img
          src={
            (user?.profileImg as string) ||
            `https://readymadeui.com/profile_6.webp`
          }
          className="w-10 h-10 object-cover rounded-full shrink-0"
          alt="Profile"
        />

        <ChevronDown
          className={`w-5 h-5 text-slate-400 inline ml-3 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute xsm:-left-[50%] transform xsm:translate-x-[20%] block rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 z-[1000] min-w-full w-max  max-h-96 overflow-auto bg-light-bg dark:bg-gray-900">
          <Link
            to={`/dashboard/profile`}
            className="dropdown-item py-2.5 px-5 flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-gray-300 text-sm cursor-pointer transition duration-300"
            onClick={closeDropdown}
          >
            <User2 className="w-4 h-4 mr-3" />
            View profile
          </Link>

          {isDashboardLink && (
            <Link
              to={'/dashboard'}
              className="dropdown-item py-2.5 px-5 flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-gray-300 text-sm cursor-pointer transition duration-300"
              onClick={closeDropdown}
            >
              <LayoutDashboard className="w-4 h-4 mr-3" />
              Dashboard
            </Link>
          )}
          <li
            className="dropdown-item py-2.5 px-5 flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-gray-300 text-sm cursor-pointer transition duration-300"
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
  );
}
