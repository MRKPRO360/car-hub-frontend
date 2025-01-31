import { createBrowserRouter } from 'react-router';
import App from '../App';
import Login from '../pages/Login';
import ChangePassword from '../pages/ChangePassword';
import Home from '../pages/Home/Home';
import About from '../pages/About';
import Signup from '../pages/Signup';
import AdminLayout from '../components/layout/AdminLayout';
import Orders from '../pages/admin/Orders';
import Users from '../pages/admin/Users';
import Cars from '../pages/admin/Cars';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Home />,
      },
      {
        path: '/change-password',
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: '/admin/dashboard',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/dashboard/',
        element: <Orders />,
      },
      {
        path: '/admin/dashboard/orders',
        element: <Orders />,
      },
      {
        path: '/admin/dashboard/cars',
        element: <Cars />,
      },
      {
        path: '/admin/dashboard/users',
        element: <Users />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/about',
    element: <About />,
  },

  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default router;
