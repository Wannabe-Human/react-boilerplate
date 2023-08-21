import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from '../components/loader/Loading';

export const RootLayout = () => {

  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};