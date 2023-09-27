import { HTMLAttributes } from 'react';

import { useScrollHeight } from '@hooks/useScrollHeight';

import { CSSVariables, GLOBAL, cn } from '@utils/tailwind';

export interface FloatCardViewProps extends HTMLAttributes<HTMLDivElement> {
  parentsClassName?: string;
  maxCardWidth?: string;
}

export const FloatCardView = ({
  className,
  parentsClassName,
  maxCardWidth,
  children,
  ...props
}: FloatCardViewProps) => {
  const isOver = useScrollHeight(
    Number(GLOBAL('header.height.pc')?.value ?? 1),
  );

  return (
    <div
      style={CSSVariables({
        'max-card-width': maxCardWidth ?? '1100px',
      })}
      className={cn('relative flex h-fit w-full', parentsClassName)}
    >
      <div
        aria-checked={isOver}
        className={cn(
          'absolute left-[calc(50%-min(49vw,calc(var(--max-card-width)/2)))] top-0 z-30 flex min-h-[500px] w-[98vw] max-w-[var(--max-card-width)] transform overflow-hidden rounded-lg bg-white shadow-xl transition-transform duration-500 direction-normal aria-checked:translate-y-[-45%]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
