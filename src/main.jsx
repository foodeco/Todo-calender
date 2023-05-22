//import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import '@/common/common.scss';
import { MyContext } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyContext>
    <RouterProvider router={router} />
  </MyContext>
);
