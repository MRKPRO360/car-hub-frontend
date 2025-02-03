import { NavLink } from 'react-router';
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

  const userItems = [
    {
      path: '/my-profile',
      text: 'My Profile',
    },
    {
      path: '/chage-password',
      text: 'My Profile',
    },
    {
      path: '/logout',
      text: 'Logout',
    },
  ];

  return (
    <div className="max-w-[1536px] mx-auto flex items-center justify-between p-2">
      <div className="flex items-center gap-0.5">
        <FaCarSide className="text-4xl text-blue" />
        <h3 className="text-xl md:text-2xl">Car Hub</h3>
      </div>
      <ul className="flex items-center md:text-lg gap-8">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? 'px-3 py-1 text-blue sm:text-lg sm:font-semibold'
                : 'text-blue/70 px-3 py-1 sm:font-semibold sm:text-lg'
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

      <ul>
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
