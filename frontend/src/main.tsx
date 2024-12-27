import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { FilesPage, FilePage, StatsPage, UploadFilesPage, Base, AuthPage } from '@/pages';
import '@/main.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});


const router = createBrowserRouter([
  // TODO: IN FUTURE, ITS NEEDED TO SETUP AN AUTH PROVIDER TO ACCESS THE MAIN PAGES
  {
    path: "/auth",
    element: <AuthPage />,
  },
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
      {
        path: '/stats',
        element: <StatsPage />,
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
