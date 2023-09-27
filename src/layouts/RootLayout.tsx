import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Loading } from '@components/loader/Loading';
import { PortalSection } from '@components/portal/Portal';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useRootRouterScrollToHash } from '@hooks/useRootRouterScrollToHash';
import { useRootAxiosInterceptor } from '@hooks/useRootAxiosInterceptor';
import { GLOBAL } from '@utils/tailwind';

export const RootLayout = () => {
  const { isMedia } = useMediaQuery();

  useRootRouterScrollToHash({
    offset: isMedia('lg', 'more')
      ? Number(GLOBAL('header.height.pc').value)
      : Number(GLOBAL('header.height.mobile').value),
  });

  useRootAxiosInterceptor();

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
      <ScrollRestoration
        getKey={(loaction) => {
          return loaction.key;
        }}
      />
    </>
  );
};
