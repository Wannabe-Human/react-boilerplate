import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { VariantProps, cva } from 'class-variance-authority';
import { Typography, Drawer } from '@material-tailwind/react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { NoDepthHeader } from '@components/header/types/NoDepthHeader';
import { DropAreaHeader } from '@components/header/types/DropAreaHeader';
import { DropBoxHeader } from '@components/header/types/DropBoxHeader';
import { MNavLinkProps } from '@components/link/MNavLink';
import LogoImg from '@assets/imgs/common/logo.png';
// import LogoWhiteImg from '@assets/imgs/common/logo_white.png';

interface NavUnit extends Pick<MNavLinkProps, 'end' | 'hash' | 'rootInclude'> {
  title: string;
  link?: string;
  list?: NavUnit[];
}

export interface NavItem extends NavUnit {
  depth?: number; // navUnit 최대 중첩 반복 횟수
  onClick?: () => void;
}

const NAV_ITEM_LIST: NavItem[] = [
  {
    title: '재단 소개',
    link: '/#content1',
    end: true,
    hash: true,
    rootInclude: true,
  },
  {
    title: '봉안당(담)',
    link: 'room',
    list: [
      {
        title: '실내 봉안당',
        link: 'indoor',
      },
      {
        title: '준실내 봉안당',
        link: 'sub-indoor',
      },
      {
        title: '야외 봉안당',
        link: 'outdoor',
      },
    ],
  },
  {
    title: '시설사진',
    link: '/#content3',
    end: true,
    hash: true,
    rootInclude: true,
  },
  {
    title: '미디어 활동',
    link: '/#content4',
    end: true,
    hash: true,
    rootInclude: true,
  },
  {
    title: '온라인 문의',
    // link: '#content5',
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

  const wrapperProps = useMemo(
    () => HeaderWrapperVariants({ type, topGap, mMenu }),
    [type, topGap, mMenu],
  );

  return (
    <>
      {/* sticky 헤더일 경우 body 의 빈부분을 채워주는 역할 */}
      {wrapperProps.includes('header-height') && (
        <div
          className={`flex h-[theme(var.header.height.mobile)] w-full md:h-[theme(var.header.height.pc)]`}
        />
      )}

      {/* header 타입에 따른 구분 */}
      {wrapperProps.includes('no-depth') && (
        <NoDepthHeader
          list={NAV_ITEM_LIST}
          mMenuOpenFn={openMenu}
          logoImgSrc={LogoImg}
        />
      )}
      {wrapperProps.includes('drop-area') && (
        <DropAreaHeader
          list={NAV_ITEM_LIST}
          mMenuOpenFn={openMenu}
          logoImgSrc={LogoImg}
          // logoReverseImgSrc={LogoWhiteImg}
        />
      )}
      {wrapperProps.includes('drop-box') && (
        <DropBoxHeader
          list={NAV_ITEM_LIST}
          mMenuOpenFn={openMenu}
          logoImgSrc={LogoImg}
          // logoReverseImgSrc={LogoWhiteImg}
        />
      )}

      {/* mobile menu 설정에 따른 구분 */}
      {wrapperProps.includes('drower') && isMedia('sm', 'less') && (
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
