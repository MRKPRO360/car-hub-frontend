import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router';

interface IMobileDrawer {
  items: { path: string; text: string }[];
}

const MobileDrawer = ({ items }: IMobileDrawer) => {
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button
        id="mobile-menu-button"
        onClick={() => setIsOpen(true)}
        className="hover:text-blue-500 p-2"
        aria-label="Menu"
      >
        <FiMenu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-primary/10 z-40" />}

      {/* Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-500"
            aria-label="Close menu"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* Drawer Content */}
        <nav className="p-4">
          <ul className="space-y-4">
            {items.map((el, id) => (
              <Link
                to={el.path}
                className="block py-2 px-4 hover:bg-gray-100 rounded"
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
