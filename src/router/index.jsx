// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../component/Layout';
import App from '../App';
import ProductPage from '../component/ProductPage';
import CartPage from '../component/CartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
     errorElement:(<h1 className='text-center text-red-700 mt-52'>چیزی پیدا نشد</h1>),
    
     children: [
      {
        index: true,// مسیر اصلی یعنی "/"
        element: <App/>,
      },
      {
        path: 'product/:id',
        element: <ProductPage />,
      },
    {
       path: 'cart',
        element: <CartPage/>,
    },
    ],
  },
]);

export default router;
