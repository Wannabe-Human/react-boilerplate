import { useState, useEffect, useMemo } from 'react';
import { Typography, Drawer } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { ATHEME } from '@utils/tailwindUtills';
import { VariantProps, cva } from 'class-variance-authority';
import { NoDepthHeader } from '@components/header/types/NoDepthHeader';
import LogoImg from '@assets/imgs/common/logo.png';
import { DropAreaHeader } from './types/DropAreaHeader';

interface NavUnit {
  title: string;
  link?: string;
  list?: NavUnit[];
}

export interface NavItem extends NavUnit {
  depth?: number; // navUnit 최대 중첩 반복 횟수
}

const NAV_ITEM_LIST: NavItem[] = [
  {
    title: '필요성',
    link: '#content1',
  },
  {
    title: '아크차단기',
    link: '#content2',
  },
  {
    title: '비정상\n아크검출',
    link: '#content3',
  },
  {
    title: '실시간\n전력 모니터링',
    link: '#content4',
  },
  {
    title: 'IoT 원격\n모니터링',
    link: '#content5',
  },
  {
    title: '시험성적서',
    link: '#content6',
  },
];

const HeaderWrapperVariants = cva('', {
  variants: {
    type: {
      'no-depth': 'no-depth',
      'drop-box': 'drop-box',
      'drop-area': 'drop-area',
    },
    topGap: {
      'header-height': 'header-height',
      none: 'none',
    },
    mMenu: {
      drower: 'drower',
    },
  },
  defaultVariants: {
    type: 'no-depth',
    topGap: 'header-height',
    mMenu: 'drower',
  },
});

export interface HeaderWrapperProps
  extends VariantProps<typeof HeaderWrapperVariants> {}

export const HeaderWrapper = ({ type, topGap, mMenu }: HeaderWrapperProps) => {
  const [open, setOpen] = useState(false);
  const { isMedia } = useMediaQuery();
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);
  const location = useLocation();
  useEffect(() => {
    //url 변경시 슬라이드 메뉴 닫힘 처리
    closeMenu();
  }, [location]);

  const vType = useMemo(() => HeaderWrapperVariants({ type }), [type]);
  const vTopGap = useMemo(() => HeaderWrapperVariants({ topGap }), [topGap]);
  const vMMenu = useMemo(() => HeaderWrapperVariants({ mMenu }), [mMenu]);

  return (
    <>
      {/* sticky 헤더일 경우 body 의 빈부분을 채워주는 역할 */}
      {vType.includes('header-height') && (
        <div
          className={`flex h-[${ATHEME(
            'header.height',
            'mobile',
          )}] w-full md:h-[${ATHEME('header.height', 'pc')}]`}
        />
      )}

      {/* header 타입에 따른 구분 */}
      {vTopGap.includes('no-depth') && (
        <NoDepthHeader
          list={NAV_ITEM_LIST}
          mMenuOpenFn={openMenu}
          logoImgSrc={LogoImg}
        />
      )}
      {vTopGap.includes('drop-area') && (
        <DropAreaHeader
          list={NAV_ITEM_LIST}
          mMenuOpenFn={openMenu}
          logoImgSrc={LogoImg}
        />
      )}

      {/* mobile menu 설정에 따른 구분 */}
      {vMMenu.includes('drower') && isMedia('sm', 'less') && (
        <Drawer open={open} placement='right' onClose={closeMenu}>
          <div className='p-4 pr-8'>
            <Typography className='my-auto h-fit text-right align-middle text-2xl font-bold'>
              목차
            </Typography>
            <hr className='dark:bg-gray-700" my-4 h-px border-0 bg-gray-200' />
            <ul className='flex flex-col items-end'>
              {NAV_ITEM_LIST.map((item, i) => {
                return (
                  <li key={`nav-item-${i}`} className='my-4 flex'>
                    <Link
                      to={item.link ?? '.'}
                      className='my-auto h-fit cursor-pointer text-center align-middle text-lg font-medium leading-[1.1rem] text-gray-800'
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Drawer>
      )}
    </>
  );
};
