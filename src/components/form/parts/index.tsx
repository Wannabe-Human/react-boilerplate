import {
  HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
} from 'react';

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
  useWatch,
} from 'react-hook-form';

import { cn } from '@utils/tailwind/cn';

export * from '@components/form/parts/FormControl';
export * from '@components/form/parts/FormDescription';
export * from '@components/form/parts/FormLabel';
export * from '@components/form/parts/FormMessage';

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  cacheMode = 'none',
  name,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, 'shouldUnregister'> & {
  cacheMode?: 'none' | 'unregister' | 'cached';
}) => {
  const {
    register,
    setValue,
    resetField,
    getValues,
    getFieldState,
    control,
    formState,
  } = useFormContext();

  const targetValue = useWatch({ name, control });
  const { isDirty } = getFieldState(name, formState);

  useEffect(() => {
    if (cacheMode == 'cached' && isDirty) {
      if (targetValue) setValue(`cached.${name}`, targetValue);
      else resetField(`cached.${name}`, { defaultValue: undefined });
    }

    if (!isDirty) {
      if (cacheMode == 'cached') {
        const cachedValue = getValues(`cached.${name}`);
        if (cachedValue) setValue(name, cachedValue, { shouldDirty: true });
      } else resetField(name);
    }
  }, [name, cacheMode, targetValue, isDirty, setValue, getValues, resetField]);

  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        {...props}
        name={name}
        shouldUnregister={cacheMode != 'none'}
      />
      {cacheMode == 'cached' && name && (
        <input type='hidden' {...register(`cached.${name}`)} />
      )}
    </FormFieldContext.Provider>
  );
};

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState, setValue, getValues } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    getValues,
    setValue,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

export const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('gap-3', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';
