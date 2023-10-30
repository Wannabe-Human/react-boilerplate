import * as z from 'zod';

export const apiBoolean = z.preprocess(
  //preprocess 가 제대로 동작하지 않아, checkbox 내부에서 default 값을 변경시킨다
  (arg) => arg,
  z.boolean().transform((val) => (val ? 1 : 0)), // 결과 형식을 1 or 0으로 변환),
);
