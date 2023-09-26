import { IconButton } from '@material-tailwind/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { VariantProps, cva } from 'class-variance-authority';
import { NavItem } from '@components/header/HeaderWrapper';
import { ButtonHTMLAttributes, useMemo } from 'react';
import { MNavLink } from '@components/link/MNavLink';
import { cn, CSSVariables } from '@utils/tailwind';

const DropAreaHeaderVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

export interface DropAreaHeaderProps
  extends ButtonHTMLAttributes<HTMLHeadElement>,
    VariantProps<typeof DropAreaHeaderVariants> {
  logoImgSrc?: string;
  logoReverseImgSrc?: string;
  list: NavItem[];
  mMenuOpenFn: () => void;
}

export const DropAreaHeader = ({
  logoImgSrc,
  logoReverseImgSrc,
  list,
  className,
  mMenuOpenFn,
  ...props
}: DropAreaHeaderProps) => {
  const CSSVariableStyle = useMemo(
    () =>
      CSSVariables({
        head: {
          'tx-color': {
            common: '#ffffff',
            category: { active: '#a1914e', expend: '#3d3c3c', over: '#3d3c3c' },
            'category-item': { active: '#ffd800' },
          },
          'bg-color': {
            hover: '#ffffff',
            over: '#ffffff',
          },
        },
        'head-expend': {
          'bg-color': '#3d3c3c7f',
        },
      }),
    [],
  );

  const isOver = true;

  return (
    <header
      className={cn(
        isOver
          ? 'bg-[var(--head-bg-color-over)] transition-[padding] duration-100 ease-out'
          : 'bg-transparent transition-all duration-100 ease-out',
        'group/header fixed top-0 z-50 flex min-h-[theme(var.header.height.mobile)] w-full flex-col items-center justify-center border-b-[1px]  border-[#f7f7f7] shadow-none hover:border-none hover:bg-[var(--head-expend-bg-color)]  xl:min-h-[theme(var.header.height.pc)] xl:hover:pt-[theme(var.header.height.pc)]',
        'after:fixed after:top-0 after:h-[theme(var.header.height.pc)] after:w-full after:transition-none after:content-[""] hover:after:bg-[var(--head-bg-color-hover)]',
        className,
      )}
      style={CSSVariableStyle}
      {...props}
    >
      {/* pc 영역 */}
      <div className='container relative'>
        <nav
          className={cn(
            'container fixed top-[0] z-50 hidden h-[theme(var.header.height.pc)] w-full flex-row items-center justify-center xl:flex ',
          )}
        >
          <div className='absolute left-0 top-0 flex h-full w-[150px]'>
            {logoImgSrc && isOver && (
              <>
                <img
                  className='cursor-pointer object-contain'
                  src={logoImgSrc}
                  alt=''
                />
              </>
            )}
            {logoReverseImgSrc && !isOver && (
              <>
                <img
                  className='block cursor-pointer object-contain group-hover/header:hidden'
                  src={logoReverseImgSrc}
                  alt=''
                />
                <img
                  className='hidden cursor-pointer object-contain group-hover/header:block'
                  src={logoImgSrc}
                  alt=''
                />
              </>
            )}
          </div>
          <div className='flex max-w-[70%] flex-1 flex-col'>
            <ul
              className={cn(
                'flex h-fit  flex-1 flex-row justify-between text-white',
                'group-hover/header:text-black',
              )}
            >
              {list.map((item, i) => {
                return (
                  <li
                    key={`nav-item-${i}`}
                    className='relative flex flex-1 flex-col'
                  >
                    <div className='flex h-[theme(var.header.height.pc)] w-full justify-center px-[10%] transition-none  '>
                      <MNavLink
                        to={item.link ?? '/'}
                        className={cn(
                          'font-leading-[1.1rem] my-auto h-fit cursor-pointer flex-row whitespace-pre-wrap text-center align-middle text-sm group-hover/header:font-bold group-hover/header:drop-shadow-none lg:text-[1.05rem]',
                          isOver
                            ? 'font-bold text-[var(--head-tx-color-category-over)] drop-shadow-none'
                            : 'font-normal text-inherit drop-shadow-lg',
                        )}
                        isActiveClassName={(isActive) =>
                          isActive
                            ? 'text-[var(--head-tx-color-category-active)]'
                            : ''
                        }
                        {...item}
                      >
                        {item.title}
                      </MNavLink>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
      {/* pc 영역 서브 메뉴 */}
      <div
        className={cn(
          'container relative hidden h-full w-full flex-row items-center justify-center xl:flex ',
        )}
      >
        <ul
          className={cn(
            'flex h-fit max-w-[70%] flex-1  flex-row justify-between text-white',
            'group-hover/header:text-black',
          )}
        >
          {list.map((item, i) => {
            return (
              <li
                key={`nav-item-${i}`}
                className='relative flex flex-1 flex-col'
              >
                {item.list && item.list.length != 0 && (
                  <ul className='hidden w-full flex-1 cursor-default flex-col py-6 text-sm leading-[1.1rem] group-hover/header:flex lg:ml-[1em] lg:text-[0.95rem] 2xl:ml-[20%] '>
                    {item.list.map((sItem, si) => {
                      return (
                        <li
                          key={`nav-item-${i}-sItem-${si}`}
                          className='my-[14px] flex w-full cursor-pointer justify-start text-white drop-shadow-sm '
                        >
                          <MNavLink
                            to={
                              sItem.link
                                ? item.link + '/' + sItem.link
                                : item.link ?? '/'
                            }
                            className={cn(
                              'my-auto flex h-fit cursor-pointer flex-row whitespace-pre-wrap text-center align-middle font-normal',
                              'before:mx-2 before:my-auto before:flex before:h-[5px] before:w-[5px] before:rounded-2xl before:bg-[var(--head-tx-color-category-item-active)] before:content-[""]',
                            )}
                            isActiveClassName={(isActive) =>
                              isActive
                                ? 'text-[var(--head-tx-color-category-item-active)] before:visible'
                                : 'before:invisible'
                            }
                            {...sItem}
                          >
                            {sItem.title}
                          </MNavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className='container z-50 flex h-full w-full flex-col'>
        {/* 모바일 영역 */}
        <nav className='flex h-full w-full flex-row items-center justify-between px-3 xl:hidden'>
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
