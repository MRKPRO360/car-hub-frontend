import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { Link, NavLink } from 'react-router';
import UserDropdown from '../../components/CHDashboard/header/UserDropdown';
import Cta from './Cta';
import { startLenis, stopLenis } from '../../App';
import { IUser } from '../../types';

interface IMobileDrawer {
  items: { path: string; text: string }[];
  user: IUser;
}

const MobileDrawer = ({ items, user }: IMobileDrawer) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const drawer = document.getElementById('mobile-drawer');
      const button = document.getElementById('mobile-menu-button');

      if (
        drawer &&
        button &&
        !drawer.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Close on escape key press
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      stopLenis();
    } else {
      startLenis();
    }
  }, [isOpen]);

  return (
    <div className="md:hidden order-2 xsm:order-3">
      {/* Menu Button */}
      <button
        id="mobile-menu-button"
        onClick={() => setIsOpen(true)}
        className="p-2 cursor-pointer transition duration-300 hover:text-blue-500 "
        aria-label="Menu"
      >
        <FiMenu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-transparent z-40" />}

      {/* Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed top-0 left-0 min-h-screen w-64 bg-light-bg dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="transition duration-300 hover:text-blue-500 cursor-pointer"
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Drawer Content */}
        <nav className="p-4">
          <ul className="space-y-4">
            {user?.role ? (
              <UserDropdown isDashboardLink={true} />
            ) : (
              <ul>
                <NavLink to="/login">
                  <Cta size="sm" text="Login" />
                </NavLink>
              </ul>
            )}
            {items.map((el, id) => (
              <Link
                to={el.path}
                className="block py-2 px-4 hover:text-primary text-gray-900 dark:text-gray-300 font-semibold text-base transition duration-300"
                onClick={() => setIsOpen(false)}
                key={id}
              >
                {el.text}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileDrawer;
