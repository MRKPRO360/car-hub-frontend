import { useEffect, useRef, useState } from 'react';

import { Link, useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  logout,
  selectCurrentToken,
} from '../../../redux/features/auth/authSlice';
import { googleLogout } from '@react-oauth/google';
import { baseApi } from '../../../redux/api/baseApi';
import { verifyToken } from '../../../utils/verifyToken';
import {
  ChevronDown,
  Home,
  LayoutDashboard,
  LogOut,
  User2,
} from 'lucide-react';
import { createPortal } from 'react-dom';

interface IUserDropDown {
  isDashboardLink?: boolean;
}
export default function UserDropdown({
  isDashboardLink = true,
}: IUserDropDown) {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const portalRef = useRef<HTMLUListElement | null>(null);

  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    function updateCoords() {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      setCoords({ top: rect.top, left: rect.left, width: rect.width });
    }

    if (isOpen) {
      updateCoords();

      const onScrollOrResize = () => updateCoords();
      window.addEventListener('scroll', onScrollOrResize);
      window.addEventListener('resize', onScrollOrResize);
      return () => {
        window.removeEventListener('scroll', onScrollOrResize);
        window.removeEventListener('resize', onScrollOrResize);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        portalRef.current?.contains(target)
      )
        return;
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    googleLogout();
  };

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const menu = (
    <ul
      style={{
        position: 'absolute',
        top: `${coords.top + 55}px`,
        left: `${coords.left - 40}px`,
        width: `${coords.width + 40}px`,
        zIndex: 99999,
        minWidth: 20,
      }}
      ref={portalRef}
      className="block rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.1)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.15)] dark:drop-shadow-[0_8px_4px_rgba(0,0,0,0.1)] dark:hover:drop-shadow-[0_8px_4px_rgba(0,0,0,0.3)] transition duration-300 min-w-full w-max max-h-96 overflow-auto bg-light dark:bg-gray-900 z-99999"
    >
      {pathname.startsWith('/dashboard') && (
        <Link
          to={'/'}
          className="dropdown-item py-2.5 px-5 flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-gray-300 text-sm cursor-pointer transition duration-300"
          onClick={() => setIsOpen(false)}
        >
          <Home className="w-4 h-4 mr-3" />
          Home
        </Link>
      )}

      <Link
        to={`/dashboard/profile`}
        className="dropdown-item py-2.5 px-5 flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-gray-300 text-sm cursor-pointer transition duration-300"
        onClick={() => setIsOpen(false)}
      >
        <User2 className="w-4 h-4 mr-3" />
        View profile
      </Link>
      {isDashboardLink && (
        <>
          <Link
            to={'/dashboard'}
            className="dropdown-item py-2.5 px-5 flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-gray-300 text-sm cursor-pointer transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard className="w-4 h-4 mr-3" />
            Dashboard
          </Link>
        </>
      )}
      <li
        className="dropdown-item py-2.5 px-5 flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-gray-300 text-sm cursor-pointer transition duration-300"
        onClick={() => {
          handleLogout();
          setIsOpen(false);
        }}
      >
        <LogOut className="w-4 h-4 mr-3" />
        Logout
      </li>
    </ul>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prevOpen) => !prevOpen);
        }}
        className="px-4 py-2 flex items-center rounded-full text-slate-900 text-sm font-medium outline-none transition duration-300  cursor-pointer dark:text-white"
        aria-haspopup="true"
        aria-expanded={isOpen}
        ref={buttonRef}
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

      {mounted && isOpen && createPortal(menu, document.body)}
    </div>
  );
}
