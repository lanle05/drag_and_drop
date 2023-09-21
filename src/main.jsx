import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage, { loader as homeLoader } from './pages/HomePage';
import SiginPage, { action as signInAction } from './pages/SiginPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: homeLoader,
  },
  {
    path: '/signin',
    element: <SiginPage />,
    action: signInAction,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
