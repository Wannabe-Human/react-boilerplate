import { RouteObject } from 'react-router-dom';

import { BlankLayout } from '@layouts/BlankLayout';
import { MainLayout } from '@layouts/MainLayout';

import { MainPage } from '@pages/MainPage';
import { TestPage } from '@pages/TestPage';

import { DefaultErrorBoundary } from '@/errorboundary/DefaultErrorBoundary';

export const mainRouter: RouteObject[] = [
  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        path: '*',
        element: <BlankLayout />,
        errorElement: <DefaultErrorBoundary />,
        children: [
          {
            path: '',
            element: <MainPage />,
            errorElement: <DefaultErrorBoundary />,
          },
          {
            path: 'test',
            element: <TestPage />,
            errorElement: <DefaultErrorBoundary />,
          },
        ],
      },
    ],
  },
];
