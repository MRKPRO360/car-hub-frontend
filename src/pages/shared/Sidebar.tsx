import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { LiaTimesSolid } from 'react-icons/lia';
import { ISidebarItems } from '../../types/sidebarItems.interface';
import { NavLink } from 'react-router';

const Sidebar = ({ items }: { items: ISidebarItems[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative p-2 m-4 text-gray-800 bg-gray-200 rounded z-200"
      >
        {isOpen ? <LiaTimesSolid /> : <RxHamburgerMenu />}
      </button>
      {/* Sidebar */}
      <div
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
        className={` h-full  w-48 bg-blue text-white pt-14 md:pt-5 px-5 transform 
  ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
  md:relative md:translate-x-0 transition-transform `}
      >
        <h2 className="text-xl font-bold">Car Hub</h2>
        <ul className="mt-4 flex flex-col space-y-2">
          {items.map((el) => (
            <NavLink
              key={el.text}
              to={el.path}
              className="p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              {el.text}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
