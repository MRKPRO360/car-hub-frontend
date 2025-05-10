// // src/components/Navbar.tsx
// import React from 'react';

// const Navbar = () => {
//   return (
//     <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="text-2xl font-bold text-blue-700">CARBARN</div>
//         <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
//           <a href="#" className="hover:text-primary transition">
//             Stock List
//           </a>
//           <a href="#" className="hover:text-primary transition">
//             Warranty
//           </a>
//           <a href="#" className="hover:text-primary transition">
//             Car Finance
//           </a>
//           <a href="#" className="hover:text-primary transition">
//             How it Works
//           </a>
//         </nav>
//         <div className="hidden md:flex items-center space-x-4 text-sm">
//           <a href="#" className="text-primary hover:underline">
//             Contact
//           </a>
//           <a href="#" className="text-primary hover:underline">
//             Login / Sign Up
//           </a>
//         </div>
//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button className="text-blue-700 focus:outline-none">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// src/components/Navbar.tsx
import { FiSearch, FiHeart, FiMenu } from 'react-icons/fi';
import { MdLocalPhone } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import { TbWorld } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Navbar = () => {
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

          <div className="flex items-center gap-1">
            <FaUser />
            <a href="#" className="hover:underline">
              Login / Sign Up
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1536px] mx-auto   ">
        <div className="bg-white px-4   flex items-center justify-between border-b border-b-gray-300/50">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary py-3">CARHUB</div>

          {/* Main Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <NavLink
              to="/"
              className="relative inline-block hover:text-primary transition py-5"
            >
              {({ isActive }) => (
                <>
                  Home
                  <span
                    className={`inline-block border-b-[2px] border-primary w-full h-[8px] absolute bottom-0 left-0 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
            <a href="#" className="hover:text-primary transition py-5">
              Stock List
            </a>
            <a href="#" className="hover:text-primary transition py-5">
              Warranty
            </a>
            <a href="#" className="hover:text-primary transition py-5">
              Car Finance
            </a>

            <NavLink
              to="/works"
              className="relative inline-block hover:text-primary transition py-5"
            >
              {({ isActive }) => (
                <>
                  How it Works
                  <span
                    className={`inline-block border-b-[2px] border-primary w-full h-[8px] absolute bottom-0 left-0 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          </nav>

          {/* Right-side Icons */}
          <div className="flex items-center space-x-4 text-blue-700 text-lg py-5">
            <button className="hover:text-blue-500" aria-label="Search">
              <FiSearch />
            </button>
            <button className="hover:text-blue-500" aria-label="Wishlist">
              <FiHeart />
            </button>
            <button className="hover:text-blue-500" aria-label="Menu">
              <FiMenu />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
