import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';

import { useFormField } from '@components/form/parts';
import { Label } from '@components/label/Label';

import { cn } from '@utils/tailwind/cn';

export const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});

FormLabel.displayName = 'FormLabel';
