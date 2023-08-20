import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';

export const App = () => {

  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: (
            <div>
              <h1>Hello World</h1>
              <a href="./about">어바웃 이동</a>
            </div>
          ),
        },
        {
          path: "about",
          element: (
            <div>
              <h1>About</h1>
              <a href="/"> 메인 이동</a>
            </div>
          ),
        },
      ]
    },
  ]);
  
  return (
    <RouterProvider router={router} />
  );
}
