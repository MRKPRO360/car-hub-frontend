import { createBrowserRouter } from 'react-router';
import App from '../App';
import Login from '../pages/Login';
import ChangePassword from '../pages/ChangePassword';
import Register from '../pages/Register';
import Home from '../pages/Home/Home';
import About from '../pages/About';

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
    path: '/register',
    element: <Register />,
  },
]);

export default router;
