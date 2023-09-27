import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { HeaderWrapper } from '@components/header/HeaderWrapper';
import { Loading } from '@components/loader/Loading';

// import { Footer } from '@components/footer/Footer';
// import { Header } from '@components/header/Header';
// import { FloatNavigation } from '@components/navigation/FloatNavigation';
// import { BottomNavigation } from '@components/navigation/BottomNavigation';

export const MainLayout = () => {
  return (
    <>
      {/* header 영역 */}
      <HeaderWrapper />
      {/* navigation 영역 */}
      {/* <FloatNavigation />
      <BottomNavigation /> */}

      {/* content 영역 */}
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      {/* footer 영역 */}
      {/* <Footer /> */}
    </>
  );
};
