import { GlobalStyleConfig } from './globalStyleProcessor';

export const I_THEME = (...strArr: string[]): string => {
  const propsArr = strArr.reduce((prev, next) => {
    const sList = next.split('.');
    return prev.concat(...sList);
  }, [] as string[]);

  return `theme(${propsArr.join('.')})`;
};

/**
 * 전역에서 참조하는 용도의 스타일 변수를 관리하고 싶을 때, 해당 파일을 수정하면 된다
 */
export const globalStyleConfig: GlobalStyleConfig = {
  header: {
    extendUnit: 'px',
    extendSwap: '@',
    extendConfigStyle: 'px',
    height: {
      mobile: {
        value: 60,
      },
      pc: {
        value: 100,
      },
    },
  },
  bottomNav: {
    extendUnit: 'px',
    extendSwap: '@',
    extendConfigStyle: 'px',
    height: {
      mobile: {
        value: 60,
      },
    },
  },
  screen: {
    extendUnit: 'px',
    extendSwap: '@',
    extendConfigStyle: 'calc(0px + @px)',
    sm: {
      value: 640,
    },
    md: {
      value: 768,
    },
    lg: {
      value: 1024,
    },
    xl: {
      value: 1100,
    },
  },
  example: {
    value: 20,
    unit: 'px',
    extendSwap: '@',
    extendConfigStyle: `calc(${I_THEME('var.bottomNav.height.')} + @px)`,
  },
};
