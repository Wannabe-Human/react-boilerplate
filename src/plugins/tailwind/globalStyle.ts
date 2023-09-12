interface GlobalStyleUnit {
  value: number | string;
  unit?: string; //단위 px, cm, md 등등
  swap?: string;
  configStyle?: string;
}

interface GlobalStyleConfig {
  [name: string]:
    | GlobalStyleUnit
    | GlobalStyleConfig
    | { extendUnit?: string; extendSwap?: string; extendConfigStyle?: string };
}

interface GlobalStyle {
  [name: string]:
    | Omit<GlobalStyleUnit, 'swap'>
    | GlobalStyle
    | { valueUnit: string };
}

const globalStyleConfig: GlobalStyleConfig = {
  var: {
    header: {
      extendUnit: 'px',
      height: {
        mobile: {
          value: 60,
        },
        pc: {
          value: 100,
        },
      },
    },
  },
  screen: {
    extendUnit: 'px',
    extendSwap: '@',
    extendConfigStyle: 'calc((2*theme(var.quickmenu.width)) + @x)',
    sm: {
      value: 640,
    },
    md: {
      value: 768,
      unit: 'font',
    },
    lg: {
      value: 1024,
      configStyle: 'test@test',
    },
    xl: {
      value: 1100,
      swap: 'calc',
    },
  },
  test: {
    value: 640,
    unit: 'px',
    configStyle: 'calc(800px + 768px)',
  },
};

const EXTEND_RESERVED_WORD_LSIT = [
  'extendUnit',
  'extendSwap',
  'extendConfigStyle',
] as const;
const UNIT_RESERVED_WORD_LSIT = ['unit', 'configStyle', 'swap'] as const;

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
    if (unit != undefined) {
      result['unit'] = unit;
    }
    if (configStyle != undefined) {
      let repalceString;
      if (swap != undefined) {
        repalceString = configStyle.replaceAll(swap, preValue['value']);
      }
      result['configStyle'] = repalceString ?? configStyle;
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

export const GLOBAL_STYLE: GlobalStyle = (() => {
  const config = globalStyleConfig;

  const result: { [name: string]: any } = {};
  Object.entries(config).forEach(([key, value]) => {
    result[key] = loopFn(value, {});
  });

  return result;
})();
