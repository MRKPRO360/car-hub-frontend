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
import CreateACar from '../pages/admin/CreateACar';
import Car from '../pages/Cars/Car';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Cars from '../pages/Home/Cars';
import ManageCars from '../pages/admin/ManageCars';

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
        path: '/cars',
        element: <Cars />,
      },
      {
        path: '/cars/:id',
        element: <Car />,
      },
      {
        path: '/change-password',
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/admin/dashboard/',
        element: <Cars />,
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
        path: '/admin/dashboard/add-car',
        element: <CreateACar />,
      },
      {
        path: '/admin/dashboard/users',
        element: <Users />,
      },
      {
        path: '/admin/dashboard/manage-cars',
        element: <ManageCars />,
      },
    ],
  },
  {
    path: '/user/dashboard',
    element: (
      <ProtectedRoute role="user">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/user/dashboard/',
        element: <Cars />,
      },
      {
        path: '/user/dashboard/orders',
        element: <Orders />,
      },

      {
        path: '/user/dashboard/add-car',
        element: <CreateACar />,
      },
      {
        path: '/user/dashboard/users',
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
