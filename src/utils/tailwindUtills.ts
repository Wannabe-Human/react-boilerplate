export { I_GLOBAL as GLOBAL } from '@plugins/tailwind/globalStyleProcessor';
export { I_THEMA as THEMA } from '@plugins/tailwind/globalStyle';
import { I_THEMA } from '@plugins/tailwind/globalStyle';

/**
 * 커스텀 테마를 사용하는 var 를 미리 정의한 함수이다
 */
export const ATHEMA = (...strArr: string[]): string => {
  return I_THEMA('var', ...strArr);
};
