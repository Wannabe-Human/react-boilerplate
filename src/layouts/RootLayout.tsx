import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from '../components/loader/Loading';
import { PortalSection } from '@components/portal/Portal';

export const RootLayout = () => {
  return (
    <>
      {/* 화면 고정 영역 */}
      <div className='pointer-events-none fixed inset-0 z-[100] flex h-full w-full flex-col'>
        <div className='relative flex h-full w-full flex-col'>
          <PortalSection portal_id='navigation_area' />
          <PortalSection portal_id='extra_area' />
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
};
