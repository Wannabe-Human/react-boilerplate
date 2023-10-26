import { ThemeProvider } from '@material-tailwind/react';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { RootLayout } from '@layouts/RootLayout';

import { mainRouter } from '@pages/Router';

import { componentTheme } from '@plugins/material-tailwind/componetTheme';

import { DefaultErrorBoundary } from '@/errorboundary/DefaultErrorBoundary';

export const App = () => {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: <DefaultErrorBoundary />,
      children: [...mainRouter],
    },
  ]);

  return (
    <ThemeProvider value={componentTheme}>
      <RecoilRoot>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};
