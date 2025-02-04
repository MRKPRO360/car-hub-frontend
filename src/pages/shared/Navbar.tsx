import { Link, NavLink } from 'react-router';
import { FaCarSide } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  logout,
  selectCurrentToken,
} from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
function Navbar() {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const items = [
    {
      path: '/',
      text: 'Home',
    },
    {
      path: '/cars',
      text: 'Cars',
    },

    {
      path: '/About',
      text: 'About',
    },
  ];

  return (
    <div className="max-w-[1536px] mx-auto flex items-center justify-between px-2 py-3 flex-col md:flex-row">
      <Link to="/" className="w-full md:w-auto cursor-pointer">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <FaCarSide className="text-4xl text-blue" />
            <h3 className="sm:text-xl md:text-2xl">Car Hub</h3>
          </div>

          <ul className="block md:hidden">
            {user?.role ? (
              <button
                onClick={handleLogout}
                className="bg-blue cursor-pointer shadow-sm shadow-blue text-light px-3 py-1 rounded-sm  sm:text-lg sm:font-semibold"
              >
                Logout
              </button>
            ) : (
              <ul>
                <NavLink
                  to="/login"
                  className="bg-blue shadow-sm cursor-pointer shadow-blue text-light px-3 py-1 rounded-sm  sm:text-lg sm:font-semibold"
                >
                  Login
                </NavLink>
              </ul>
            )}
          </ul>
        </div>
      </Link>
      <ul className="flex items-center  gap-x-4 gap-y-2 mt-2 md:mt-0s md:gap-8 font-semibold flex-wrap">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? 'px-3 py-1 text-blue  md:text-lg'
                : 'text-blue/70 px-3 py-1 md:text-lg'
            }
          >
            {item.text}
          </NavLink>
        ))}

        {user?.role && (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'px-3 py-1 text-blue sm:text-lg sm:font-semibold'
                : 'text-blue/70 px-3 py-1 sm:font-semibold sm:text-lg'
            }
            to={`/${user.role}/dashboard`}
          >
            Dashboard
          </NavLink>
        )}
      </ul>

      <ul className="hidden md:block">
        {user?.role ? (
          <button
            onClick={handleLogout}
            className="bg-blue cursor-pointer shadow-sm shadow-blue text-light px-3 py-1 rounded-sm  sm:text-lg sm:font-semibold"
          >
            Logout
          </button>
        ) : (
          <ul>
            <NavLink
              to="/login"
              className="bg-blue shadow-sm cursor-pointer shadow-blue text-light px-3 py-1 rounded-sm  sm:text-lg sm:font-semibold"
            >
              Login
            </NavLink>
          </ul>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
