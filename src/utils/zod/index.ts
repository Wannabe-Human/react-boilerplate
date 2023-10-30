import * as z from 'zod';

export const apiBoolean = (defaultValue: number | boolean) =>
  z
    .boolean()
    .transform((val) => (val ? 1 : 0))
    .default(
      typeof defaultValue == 'boolean' ? defaultValue : defaultValue == 1,
    ); // 결과 형식을 1 or 0으로 변환),
// z.preprocess(
//   //preprocess 가 제대로 동작하지 않아, checkbox 내부에서 default 값을 변경시킨다
//   (arg) => (typeof arg == 'boolean' ? arg : arg === 1),
//   z.boolean().transform((val) => (val ? 1 : 0)), // 결과 형식을 1 or 0으로 변환),
// );
