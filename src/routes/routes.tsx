import { createBrowserRouter } from 'react-router';
import App from '../App';
import Login from '../pages/Login';
import ChangePassword from '../pages/ChangePassword';
import Home from '../pages/Home/Home';
import About from '../pages/About';
import Signup from '../pages/Signup';

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
  { path: '/admin', element: <App /> },
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
