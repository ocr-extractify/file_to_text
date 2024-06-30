import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UploadFilesPage from '@/pages/UploadFilesPage.tsx';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import '@/main.css';
import FilesPage from './pages/FilesPage';
import FilePage from './pages/FilePage';
import Base from './pages/_Base';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Base />,
    children: [
      {
        path: '/',
        element: <Navigate to="/upload" />,
      },
      {
        path: '/upload',
        element: <UploadFilesPage />,
      },
      {
        path: '/files',
        element: <FilesPage />,
      },
      {
        path: '/files/:id',
        element: <FilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
);
