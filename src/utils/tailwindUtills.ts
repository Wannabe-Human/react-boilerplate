import { I_THEMA } from '@plugins/tailwind/globalStyle';
import { CSSProperties } from 'react';

export { I_GLOBAL as GLOBAL } from '@plugins/tailwind/globalStyleProcessor';
export { I_THEMA as THEMA } from '@plugins/tailwind/globalStyle';

/**
 * 커스텀 테마를 사용하는 var 를 미리 정의한 함수이다
 */
export const ATHEMA = (...strArr: string[]): string => {
  return I_THEMA('var', ...strArr);
};

const loopFn = (
  path: string,
  value: { [name: string]: any },
): CSSProperties => {
  return Object.entries(value).reduce((pri, parm) => {
    const [k, v] = parm;
    if ('string' == typeof v || v == undefined || v == null) {
      return {
        ...pri,
        ['--' + path + '-' + k]: v,
      };
    } else {
      return {
        ...pri,
        ...loopFn(path + '-' + k, v),
      };
    }
  }, {} as any);
};

export interface CSSVariableObj {
  [name: string]: CSSVariableObj | string;
}

export const CSSVariables = (config: CSSVariableObj): CSSProperties => {
  return Object.entries(config as { [name: string]: string }).reduce(
    (pri, [k, v]) => {
      if ('string' == typeof v || v == undefined || v == null) {
        return {
          ...pri,
          ['--' + k]: v,
        };
      } else {
        return {
          ...pri,
          ...loopFn(k, v),
        };
      }
      return pri;
    },
    {} as any,
  ) as any;
};
