import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { RootLayout } from '@layouts/RootLayout';
import { componentTheme } from '@plugins/material-tailwind/componetTheme';
import { RootErrorBoundary } from '@/errorboundary/RootErrorBoundary';

export const App = () => {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: <RootErrorBoundary />,
      children: [
        {
          index: true, // children 중 최우선 순위
          element: (
            <div>
              <h1 className='text-3xl font-bold'>Hello World</h1>
              <a
                className='btn btn-lg md:btn font-thin sm:rounded-none'
                href='./about'
              >
                어바웃 이동
              </a>
            </div>
          ),
        },
        {
          path: '/about',
          element: (
            <div>
              <h1 className='my-cus hello'>About</h1>
              <a href='/'> 메인 이동</a>
              <a href='/error'> 에러 이동</a>
            </div>
          ),
        },
        {
          path: '/about',
          loader: async () => {
            return {};
          },
          element: (
            <div>
              <h1>About</h1>
              <a href='/'> 메인 이동</a>
              <a href='/error'> 에러 이동</a>
            </div>
          ),
        },
      ],
    },
  ]);

  return (
    <ThemeProvider value={componentTheme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
};
