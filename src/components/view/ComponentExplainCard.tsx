import { HTMLAttributes, ReactNode } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';

import { CSSVariables, cn } from '@utils/tailwind';

const CardVariants = cva('flex h-fit w-full', {
  variants: {
    variant: {
      default: 'flex-wrap container [&_.explain-area]:w-full',
    },
    componentArea: {
      'center-padding':
        '[&_.preview]:p-7 [&_.preview]:justify-center [&_.preview]:items-center [&_.preview]:border-[var(--border-color-gray)] [&_.preview]:shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    componentArea: 'center-padding',
  },
});

export interface ComponentExplainCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof CardVariants> {
  title: string;
  description: string | ReactNode;
}

export const ComponentExplainCard = ({
  title,
  description,
  variant,
  componentArea,
  className,
  children,
  ...props
}: ComponentExplainCardProps) => {
  const DescriptionEl = typeof description == 'string' ? 'p' : Slot;
  return (
    <section
      style={CSSVariables({
        border: {
          color: {
            gray: '#e4e4e7',
          },
        },
      })}
      className={cn(CardVariants({ variant, componentArea, className }))}
      {...props}
    >
      {/* 제목 및 설명 */}
      <div className='explain-area flex flex-wrap'>
        <h2 className='w-full text-2xl font-extrabold tracking-[0.02em] [word-spacing:0.1em]'>
          {title}
        </h2>
        <DescriptionEl className='mt-2  whitespace-pre-wrap text-base font-normal tracking-wide [word-spacing:0.15em]'>
          {description}
        </DescriptionEl>
      </div>
      {/* 컨트롤 패널 */}
      {/* 실제 컴포넌트가 들어가는 영역 */}
      <div className='preview mt-4 flex min-h-[180px] w-full overflow-hidden rounded-md border'>
        {children}
      </div>
    </section>
  );
};
