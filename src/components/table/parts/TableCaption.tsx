import { HTMLAttributes, forwardRef } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@utils/tailwind/cn';

const CaptionVariants = cva('mt-4 text-sm text-muted-foreground', {
  variants: {
    captionAlign: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
    },
    captionPosition: {
      top: 'caption-top',
      bottom: 'caption-bottom',
    },
  },
  defaultVariants: {
    captionAlign: 'center',
    captionPosition: 'bottom',
  },
});

export interface TableCaptionProps
  extends HTMLAttributes<HTMLTableCaptionElement>,
    VariantProps<typeof CaptionVariants> {}

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, captionAlign, captionPosition, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      CaptionVariants({ captionAlign, captionPosition, className }),
    )}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';
