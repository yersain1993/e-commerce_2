import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Home from '../views/Home';
import Login from '../views/Login';
import Purchases from '../views/Purchases';
import ProductsDetail from '../views/ProductsDetail';
import NotFound from '../views/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Profile from '../views/Profile';
import { productsLoader } from './loaders/productsLoader';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: productsLoader,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/purchases',
        element: (
          <ProtectedRoute>
            <Purchases />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products/:id',
        element: <ProductsDetail />,
      },
      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
]);
