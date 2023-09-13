import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { RootLayout } from '@layouts/RootLayout';
import { componentTheme } from '@plugins/material-tailwind/componetTheme';
import { DefaultErrorBoundary } from '@/errorboundary/DefaultErrorBoundary';
import { mainRouter } from '@pages/Router';

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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
