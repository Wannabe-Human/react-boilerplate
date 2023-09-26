import { CSSProperties } from 'react';

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
    },
    {} as any,
  ) as any;
};
