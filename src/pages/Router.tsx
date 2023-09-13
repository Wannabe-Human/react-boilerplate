import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout';
import { MainPage } from '@pages/MainPage';
import { DefaultErrorBoundary } from '@/errorboundary/DefaultErrorBoundary';

export const mainRouter: RouteObject[] = [
  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        path: '*',
        element: <MainPage />,
        errorElement: <DefaultErrorBoundary />,
      },
    ],
  },
];
