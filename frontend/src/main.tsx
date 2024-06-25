import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UploadFilesPage from '@/pages/UploadFilesPage.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import '@/main.css';
import FilesPage from './pages/FilesPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <UploadFilesPage />,
  },
  {
    path: '/files',
    element: <FilesPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <App /> */}
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
);
