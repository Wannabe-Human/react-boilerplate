import { GLOBAL_STYLE_CONFIG } from './globalStyle';

/**
 * 테마를 사용할때 필요한 문자열을 만들어주는 함수
 */

interface GlobalStyleUnit {
  value: number | string;
  unit?: string; //단위 px, cm, md 등등
  swap?: string;
  configStyle?: string;
}

export interface GlobalStyleConfig {
  [name: string]:
    | GlobalStyleUnit
    | GlobalStyleConfig
    | { extendUnit?: string; extendSwap?: string; extendConfigStyle?: string };
}

interface GlobalStyle extends Required<Omit<GlobalStyleUnit, 'swap'>> {
  valueUnit: string;
}

const EXTEND_RESERVED_WORD_LSIT = [
  'extendUnit',
  'extendSwap',
  'extendConfigStyle',
] as const;
const UNIT_RESERVED_WORD_LSIT = ['unit', 'configStyle', 'swap'] as const;

/**
 * GLOBAL_STYLE_CONFIG 를 분석하는 재귀 함수
 */
const loopFn = (
  preValue: { [name: string]: any },
  preConfig: {
    extendUnit?: string;
    extendSwap?: string;
    extendConfigStyle?: string;
  },
) => {
  //상속받은 설정 갱신 및 관리, 하위티어에게 건내는 용도
  const exteondConfig = Object.entries(preValue)
    .filter(([key]) => EXTEND_RESERVED_WORD_LSIT.includes(key as any))
    .reduce((acc, param) => {
      const [k, v] = param as [(typeof EXTEND_RESERVED_WORD_LSIT)[number], any];
      return {
        ...acc,
        [k]: v ?? acc[k],
      };
    }, preConfig);

  const result: { [name: string]: any } = {};

  if ('value' in preValue) {
    // 현재 config 값 추출
    const unit =
      preValue['unit'] != undefined
        ? preValue['unit']
        : 'extendUnit' in exteondConfig
        ? exteondConfig['extendUnit']
        : undefined;
    const configStyle =
      preValue['configStyle'] != undefined
        ? preValue['configStyle']
        : 'extendConfigStyle' in exteondConfig
        ? exteondConfig['extendConfigStyle']
        : undefined;
    const swap =
      preValue['swap'] != undefined
        ? preValue['swap']
        : 'extendSwap' in exteondConfig
        ? exteondConfig['extendSwap']
        : undefined;

    //config 값 의 상황에 맞게 값 처리
    result['unit'] = unit ?? '';
    if (configStyle != undefined) {
      let repalceString;
      if (swap != undefined) {
        repalceString = configStyle.replaceAll(swap, preValue['value']);
      }
      result['configStyle'] = repalceString ?? configStyle;
    } else {
      result['configStyle'] = preValue['value'] + result['unit'];
    }
    result['value'] = preValue['value'];
    result['valueUnit'] = preValue['value'] + result['unit'];
  }

  Object.entries(preValue)
    .filter(
      ([key]) =>
        ![
          ...EXTEND_RESERVED_WORD_LSIT,
          ...UNIT_RESERVED_WORD_LSIT,
          'value',
        ].includes(key as any),
    )
    .forEach(([key, value]) => {
      result[key] = loopFn(value, exteondConfig);
    });
  return result;
};

/**
 * 실제 참조되어 사용되는값
 */
const GLOBAL_STYLE: any = (() => {
  const config = GLOBAL_STYLE_CONFIG;

  const result: { [name: string]: any } = {};
  Object.entries(config).forEach(([key, value]) => {
    result[key] = loopFn(value, {});
  });

  return result as any;
})();

/**
 * util 에서 export 하여 사용 => GLOBAL
 */
export const I_GLOBAL = (...strArr: string[]): GlobalStyle => {
  try {
    const propsArr = strArr.reduce((prev, next) => {
      const sList = next.split('.');
      return prev.concat(...sList);
    }, [] as string[]);

    return propsArr.reduce((prev, next) => {
      return prev[next];
    }, GLOBAL_STYLE as any);
  } catch (error) {
    // new Error();
    console.error(error);
    return {} as GlobalStyle;
  }
};
