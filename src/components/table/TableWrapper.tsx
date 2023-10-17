import { HTMLAttributes, forwardRef } from 'react';

import { cn } from '@utils/tailwind/cn';

export const TableWrapper = forwardRef<
  HTMLTableElement,
  HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className='relative w-full overflow-auto'>
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
TableWrapper.displayName = 'TableWrapper';
