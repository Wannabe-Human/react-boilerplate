import { DevTool } from '@hookform/devtools';
import * as z from 'zod';

import { useZodForm } from '@hooks/useZodForm';

import { CheckboxField } from '@components/field/CheckboxField';
import { InputField } from '@components/field/InputField';
import { RadioGroupField } from '@components/field/RadioGroupField';
import { RadioItemField } from '@components/field/RadioItemField';
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

import { apiBoolean } from '@utils/zod';

const formSchema = z.object({
  name: z.string().min(1, '이름은 필수값입니다.'),
  // phone: z
  //   .string()
  //   .regex(
  //     /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
  //     '휴대폰 번호 형식이 아닙니다.',
  //   ),
  isCheck: apiBoolean(1),
  // email: z.optional(z.string().email('이메일 형식이 아닙니다.')),
  description: z.string().optional(),
  hiList: z.enum(['all', 'hello', 'hi', 'hey']),
  // lastname: z
  //   .string()
  //   .transform((val) => val.length)
  //   .pipe(z.number().min(5)),
  // age: z.number(),
  // address: z.object({
  //   address1: z.string().nonempty(),
  //   address2: z.string().nonempty(),
  //   country: z.string().nonempty(),
  //   insideobj: z.object({
  //     id: z.string(),
  //     insideobj: z.object({
  //       id: z.string(),
  //     }),
  //   }),
  //   code: z.array(
  //     z.object({
  //       id: z.string(),
  //       somevalue: z.number().nonpositive(),
  //       insideobj: z.object({
  //         id: z.string(),
  //       }),
  //     }),
  //   ),
  // }),
});

export const SmartFormSample = () => {
  const form = useZodForm(formSchema, {
    // shouldUseNativeValidation: true,
  });

  return (
    <ComponentExplainCard
      title='SMART FORM (SmartForm)'
      isExampleOpen
      description={
        '다양한 상황을 가정한 FORM의 예시입니다.\n가변적으로 FORM 의 입력값을 상황에 맞춰 변경할 수 있습니다'
      }
    >
      <DevTool control={form.control} />
      <Form {...form}>
        <div className='flex w-full flex-col space-y-6 px-1 md:px-7'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='flex flex-col md:flex-row'>
                <FormLabel className='pt-2text-md flex w-32 items-start justify-start md:text-lg'>
                  이름
                </FormLabel>
                <FormControl className='flex-1'>
                  <InputField
                    className='text-sm'
                    placeholder='닉네임을 적어주세요'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='p-2 text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            cacheMode='cached'
            render={({ field }) => (
              <FormItem className='flex flex-col md:flex-row'>
                <FormLabel className='pt-2text-md flex w-32 items-start justify-start md:text-lg'>
                  설명
                </FormLabel>
                <FormControl className='flex-1'>
                  <TextareaField
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
            name='isCheck'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center md:flex-row'>
                <FormControl>
                  <CheckboxField
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className='pt-2text-md flex w-32 cursor-pointer items-start justify-start md:text-lg'>
                  체크박스
                </FormLabel>
                <FormMessage className='p-2 text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='hiList'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>라디오 그룹 예시</FormLabel>
                <FormControl>
                  <RadioGroupField
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioItemField value='all' />
                      </FormControl>
                      <FormLabel className='cursor-pointer font-normal'>
                        값 : all
                      </FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioItemField value='hello' />
                      </FormControl>
                      <FormLabel className='cursor-pointer font-normal'>
                        값 : hello
                      </FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioItemField value='hi' />
                      </FormControl>
                      <FormLabel className='cursor-pointer font-normal'>
                        값 : hi
                      </FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioItemField value='hey' />
                      </FormControl>
                      <FormLabel className='cursor-pointer font-normal'>
                        값 : hey
                      </FormLabel>
                    </FormItem>
                  </RadioGroupField>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            //   <FormItem className='flex flex-col items-center md:flex-row'>
            //     <FormControl>
            //       <CheckboxField
            //         checked={field.value}
            //         onCheckedChange={field.onChange}
            //       />
            //     </FormControl>
            //     <FormLabel className='pt-2text-md flex w-32 cursor-pointer items-start justify-start md:text-lg'>
            //       체크박스
            //     </FormLabel>
            //     <FormMessage className='p-2 text-xs' />
            //   </FormItem>
            // )}
          />
          <button
            onClick={form.handleSubmit(
              (data) => {
                console.log('테스트 데이터', data);
              },
              (error) => console.log(error),
            )}
          >
            출력
          </button>
        </div>
      </Form>
    </ComponentExplainCard>
  );
};
