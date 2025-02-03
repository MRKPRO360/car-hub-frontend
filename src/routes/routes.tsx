import { createBrowserRouter } from 'react-router';
import App from '../App';
import Login from '../pages/Login';
import ChangePassword from '../pages/user/ChangePassword';
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
import UserLayout from '../components/layout/UserLayout';
import MyOrders from '../pages/user/MyOrders';
import ManageProfile from '../pages/user/ManageProfile';
import VerifyOrder from '../pages/user/VerifyOrder';
import FilterCars from '../pages/Cars/FilterCars';

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
        element: <FilterCars />,
      },
      {
        path: '/cars/:id',
        element: <Car />,
      },
      {
        path: '/change-password',
        element: <ChangePassword />,
      },
      {
        path: '/about',
        element: <About />,
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
        element: <FilterCars />,
      },
      {
        path: '/admin/dashboard/orders',
        element: <Orders />,
      },
      {
        path: '/admin/dashboard/cars',
        element: <FilterCars />,
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
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/user/dashboard/',
        element: <FilterCars />,
      },
      {
        path: '/user/dashboard/cars/',
        element: <FilterCars />,
      },
      {
        path: '/user/dashboard/orders',
        element: <MyOrders />,
      },
      {
        path: '/user/dashboard/verify',
        element: <VerifyOrder />,
      },

      {
        path: '/user/dashboard/my-profile',
        element: <ManageProfile />,
      },
      {
        path: '/user/dashboard/change-password',
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default router;
