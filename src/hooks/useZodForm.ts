import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormProps, useForm } from 'react-hook-form';
import * as z from 'zod';

export const useZodForm = (
  schema: z.ZodTypeAny,
  formProps?: Omit<UseFormProps, 'resolver' | 'defaultValues'>,
) => {
  const defineValue = useMemo(() => {
    const result = getDefaults<typeof schema>(schema as any);
    console.log('zod schema defaultValue 생성 : ', result);
    return result;
  }, [schema]);

  return useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defineValue,
    ...formProps,
  });
};

function getDefaults<T extends z.ZodTypeAny>(
  schema: z.AnyZodObject | z.ZodEffects<any>,
): z.infer<T> {
  // Check if it's a ZodEffect
  if (schema instanceof z.ZodEffects) {
    // Check if it's a recursive ZodEffect
    if (schema.innerType() instanceof z.ZodEffects)
      return getDefaults(schema.innerType());
    // return schema inner shape as a fresh zodObject
    return getDefaults(z.ZodObject.create(schema.innerType().shape));
  }

  function getDefaultValue(schema: z.ZodTypeAny): unknown {
    if (schema instanceof z.ZodDefault) return schema._def.defaultValue();
    // return an empty array if it is
    if (schema instanceof z.ZodArray) return [];
    // return an empty string if it is
    if (schema instanceof z.ZodString) return '';
    // return an content of object recursivly
    if (schema instanceof z.ZodObject) return getDefaults(schema);

    // return '' , null 과 undefined 는 input 태그에서 취급을 못하므로 빈문자열 할당, 하지만 가능하면 default rkqtdmf dlqd
    if (!('innerType' in schema._def)) return '';
    return getDefaultValue(schema._def.innerType);
  }

  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      return [key, getDefaultValue(value as any)];
    }),
  );
}

// const defaultValue = getDefaults<typeof validatorSchema>(validatorSchema)
