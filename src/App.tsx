import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
        </div>
      ),
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);
  
  return (
    <RouterProvider router={router} />
  );
}
