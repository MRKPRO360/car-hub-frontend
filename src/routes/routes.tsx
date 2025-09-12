import { createBrowserRouter } from 'react-router';
import App from '../App';
import Login from '../pages/Login';
// import ChangePassword from '../pages/user/ChangePassword';
import Home from '../pages/Home/Home';
import About from '../pages/About';
import Signup from '../pages/Signup';
// import AdminLayout from '../components/layout/AdminLayout';
// import Orders from '../pages/admin/CustomerOrders';
// import Users from '../pages/admin/Users';
// import CreateACar from '../pages/admin/CreateACar';
// import ManageProfile from '../pages/user/ManageProfile';
// import ManageCars from '../pages/admin/ManageCars';
// import UpdateCar from '../pages/admin/UpdateCar';

import ProtectedRoute from '../components/layout/ProtectedRoute';
// import UserLayout from '../components/layout/UserLayout';
// import MyOrders from '../pages/user/MyOrders';
import VerifyOrder from '../pages/user/VerifyOrder';
import FilterCars from '../pages/Cars/FilterCars';
import HowItWorks from '../pages/HowItWorks';
import Stock from '../pages/Stock';
import DashboardLayout from '../components/layout/DashboardLayout';
import NotFound from '../pages/NotFound';
import UserProfiles from '../pages/profile/UserProfiles';
import BasicTables from '../pages/user/orders/MyOrders';
import AdminStats from '../pages/admin/Stats/AdminStats';
import CustomerOrders from '../pages/admin/CustomerOrders';
import AllCars from '../pages/admin/AllCars';
import AllUsers from '../pages/admin/AllUsers';
import AddACar from '../pages/admin/AddACar';
import UpdateACar from '../pages/admin/UpdateACar';
import Wishlist from '../pages/Wishlist';
import CarDetails from '../pages/Cars/CarDetails';
import FBLoginSuccess from '../pages/shared/FBLoginSuccess';

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
        path: '/stock',
        element: <Stock />,
      },
      {
        path: '/cars',
        element: <FilterCars />,
      },
      {
        path: '/works',
        element: <HowItWorks />,
      },
      {
        path: '/cars/:id',
        element: <CarDetails />,
      },
      // {
      //   path: '/change-password',
      //   element: <ChangePassword />,
      // },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/wishlist',
        element: <Wishlist />,
      },
    ],
    errorElement: <NotFound />,
  },
  // OLD
  // {
  //   path: '/admin/dashboard',
  //   element: (
  //     <ProtectedRoute role="admin">
  //       <AdminLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     {
  //       path: '/admin/dashboard/',
  //       element: <FilterCars />,
  //     },
  //     {
  //       path: '/admin/dashboard/orders',
  //       element: <Orders />,
  //     },
  //     {
  //       path: '/admin/dashboard/cars',
  //       element: <FilterCars />,
  //     },
  //     {
  //       path: '/admin/dashboard/add-car',
  //       element: <CreateACar />,
  //     },
  //     {
  //       path: '/admin/dashboard/users',
  //       element: <Users />,
  //     },
  //     {
  //       path: '/admin/dashboard/manage-cars',
  //       element: <ManageCars />,
  //     },
  //     {
  //       path: '/admin/dashboard/manage-cars/:id',
  //       element: <UpdateCar />,
  //     },
  //     {
  //       path: '/admin/dashboard/my-profile',
  //       element: <ManageProfile />,
  //     },
  //   ],
  //   errorElement: <NotFound />,
  // },
  // CHECKING
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'user']}>
            <UserProfiles />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/admin-stats',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminStats />
          </ProtectedRoute>
        ),
      },

      {
        path: '/dashboard/profile',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'user']}>
            <UserProfiles />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/my-orders',
        element: <BasicTables />,
      },
      {
        path: '/dashboard/verify',
        element: (
          <ProtectedRoute allowedRoles={['user']}>
            <VerifyOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/customer-orders',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <CustomerOrders />,
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/all-cars',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AllCars />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/add-car',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AddACar />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/update-car/:id',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <UpdateACar />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/all-users',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AllUsers />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // END CHECKING
  // {
  //   path: '/user/dashboard',
  //   element: (
  //     <ProtectedRoute role="user">
  //       <UserLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     {
  //       path: '/user/dashboard/',
  //       element: <FilterCars />,
  //     },
  //     {
  //       path: '/user/dashboard/cars/',
  //       element: <FilterCars />,
  //     },
  //     {
  //       path: '/user/dashboard/orders',
  //       element: <MyOrders />,
  //     },
  //     {
  //       path: '/user/dashboard/verify',
  //       element: <VerifyOrder />,
  //     },

  //     {
  //       path: '/user/dashboard/my-profile',
  //       element: <ManageProfile />,
  //     },
  //     {
  //       path: '/user/dashboard/change-password',
  //       element: <ChangePassword />,
  //     },
  //   ],
  //   errorElement: <NotFound />,
  // },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/fblogin-success',
    element: <FBLoginSuccess />,
  },

  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default router;
