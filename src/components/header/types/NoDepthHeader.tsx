import { IconButton } from '@material-tailwind/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ATHEME } from '@utils/tailwindUtills';
import { VariantProps, cva } from 'class-variance-authority';
import { NavItem } from '@components/header/HeaderWrapper';

const NoDepthHeaderVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

export interface NoDepthHeaderProps
  extends VariantProps<typeof NoDepthHeaderVariants> {
  logoImgSrc?: string;
  list: NavItem[];
  mMenuOpenFn: () => void;
}

export const NoDepthHeader = ({
  logoImgSrc,
  list,
  mMenuOpenFn,
  ...props
}: NoDepthHeaderProps) => {
  return (
    <header
      className={`fixed top-0 z-50 flex h-[${ATHEME(
        'header.height',
        'mobile',
      )}] w-full bg-white shadow-md md:h-[${ATHEME('header.height', 'pc')}]`}
      {...props}
    >
      <div className='container flex h-full w-full'>
        {/* pc 영역 */}
        <nav className='relative hidden h-full w-full flex-row items-center justify-center md:flex'>
          <div className='absolute inset-x-0 inset-y-auto flex h-[30px] w-[110px] flex-auto bg-white lg:w-[130px]'>
            <img className='object-contain' src={logoImgSrc} alt='' />
          </div>
          <ul className='flex max-w-[60%] flex-1 flex-row justify-between'>
            {list.map((item, i) => {
              return (
                <li key={`nav-item-${i}`} className='flex'>
                  <Link
                    to={item.link ?? '.'}
                    className='my-auto h-fit cursor-pointer whitespace-pre-wrap text-center align-middle text-sm font-medium leading-[1.1rem] lg:text-[1rem]'
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* 모바일 영역 */}
        <nav className='flex h-full w-full flex-row items-center justify-between px-3 md:hidden'>
          <div className='flex h-[30px] w-[110px] bg-white lg:w-[130px]'>
            <img className='object-contain' src={logoImgSrc} alt='' />
          </div>
          <IconButton variant='text' color='white' onClick={mMenuOpenFn}>
            <Bars3Icon className='h-11 w-10 text-black' />
          </IconButton>
        </nav>
      </div>
    </header>
  );
};
