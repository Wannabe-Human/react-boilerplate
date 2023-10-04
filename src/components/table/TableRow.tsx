import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@utils/tailwind/cn';

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors data-[state=selected]:bg-muted hover:[tbody_&]:bg-muted/50',
      className,
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';
