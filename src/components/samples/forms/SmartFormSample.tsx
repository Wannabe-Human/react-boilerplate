import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useZodForm } from '@hooks/useZodForm';

import { InputField } from '@components/field/InputField';
import { TextareaField } from '@components/field/TextAreaField';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/form/parts';
import { ComponentExplainCard } from '@components/view/ComponentExplainCard';

const formSchema = z.object({
  name: z.string().min(1, '이름은 필수값입니다.'),
  phone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      '휴대폰 번호 형식이 아닙니다.',
    ),
  // email: z.optional(z.string().email('이메일 형식이 아닙니다.')),
  description: z.number().optional(),
  firstname: z.string().min(2, 'error on firstname'),
  lastname: z
    .string()
    .transform((val) => val.length)
    .pipe(z.number().min(5)),
  age: z.number(),
  address: z.object({
    address1: z.string().nonempty(),
    address2: z.string().nonempty(),
    country: z.string().nonempty(),
    insideobj: z.object({
      id: z.string(),
      insideobj: z.object({
        id: z.string(),
      }),
    }),
    code: z.array(
      z.object({
        id: z.string(),
        somevalue: z.number().nonpositive(),
        insideobj: z.object({
          id: z.string(),
        }),
      }),
    ),
  }),
});

export const SmartFormSample = () => {
  const form = useZodForm(formSchema);

  return (
    <ComponentExplainCard
      title='SMART FORM (SmartForm)'
      description={
        '다양한 상황을 가정한 FORM의 예시입니다.\n가변적으로 FORM 의 입력값을 상황에 맞춰 변경할 수 있습니다'
      }
    >
      <DevTool control={form.control} />
      <Form {...form}>
        <div className='flex w-full flex-col space-y-6 px-1 md:px-7'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='flex flex-col md:flex-row'>
                <FormLabel className='pt-2text-md flex w-32 items-start justify-start md:text-lg'>
                  문의내용
                </FormLabel>
                <FormControl className='flex-1'>
                  <InputField
                    type='number'
                    className='text-sm'
                    placeholder='상세 내용을 적어주세요'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='p-2 text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.address1'
            cacheMode='cached'
            render={({ field }) => (
              <FormItem className='flex flex-col md:flex-row'>
                <FormLabel className='pt-2text-md flex w-32 items-start justify-start md:text-lg'>
                  주소
                </FormLabel>
                <FormControl className='flex-1'>
                  <InputField
                    className='text-sm'
                    placeholder='상세 내용을 적어주세요'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='p-2 text-xs' />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </ComponentExplainCard>
  );
};
