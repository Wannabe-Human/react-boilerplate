import { HTMLAttributes, useState } from 'react';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { api } from '@plugins/axios/api';

import { useAlert } from '@hooks/useAlert';

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

import { cn } from '@utils/tailwind/cn';

// import { useRootChangePath } from '@hooks/useRootChangePath';

export interface SmartFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  name: z.string().min(1, '이름은 필수값입니다.'),
  phone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      '휴대폰 번호 형식이 아닙니다.',
    ),
  // email: z.optional(z.string().email('이메일 형식이 아닙니다.')),
  description: z.string().optional(),
});

export const SmartForm = ({ className, ...props }: SmartFormProps) => {
  const [isAgreement, setIsAgreement] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const ACECounterDetectURL = useRootChangePath('/inquiry/success');
  const navigate = useNavigate();
  const { alertClick } = useAlert();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: 'test',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    resetAndHandle();
    console.log('데이터 정보', values);
  };

  const resetAndHandle = () => {
    setIsAgreement(false);
    form.reset();
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <DevTool control={form.control} />
      <Form {...form}>
        <div className='flex w-full flex-col space-y-6 px-1 md:px-7'>
          {isAgreement && (
            <>
              <FormField
                control={form.control}
                name='name'
                cacheMode='unregister'
                render={({ field }) => (
                  <FormItem className='flex flex-col md:flex-row'>
                    <FormLabel className='justify-starttext-md flex w-32 items-center md:text-lg'>
                      성함
                    </FormLabel>
                    <FormControl className='flex-1'>
                      <InputField
                        className='text-sm'
                        placeholder='이름'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='p-2 text-xs' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                cacheMode='cached'
                render={({ field }) => (
                  <FormItem className='flex flex-col md:flex-row'>
                    <FormLabel className='justify-starttext-md flex w-32 items-center md:text-lg'>
                      연락처
                    </FormLabel>
                    <FormControl className='flex-1'>
                      <InputField
                        className='text-sm'
                        placeholder='010XXXX1234'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='p-2 text-xs' />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='flex flex-col md:flex-row'>
                <FormLabel className='pt-2text-md flex w-32 items-start justify-start md:text-lg'>
                  문의내용
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
        </div>
      </Form>
      <div className='mt-2 flex w-full justify-center text-xs'>
        <Checkbox
          label='개인정보 수집 및 활용에 동의합니다.'
          checked={isAgreement}
          onChange={(e) => setIsAgreement(e.target.checked)}
        />
      </div>
      <div className='flex flex-row justify-center'>
        <Button
          variant='outlined'
          size='lg'
          className='w-1/3 min-w-[140px] rounded-full py-3'
          // color=''
          disabled={!isAgreement}
          onClick={form.handleSubmit(onSubmit)}
        >
          <span>문의하기</span>
        </Button>
      </div>
    </div>
  );
};
