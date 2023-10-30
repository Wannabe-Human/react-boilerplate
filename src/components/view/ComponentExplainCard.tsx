import { HTMLAttributes, ReactNode, useState } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';

import { CSSVariables, cn } from '@utils/tailwind';

const CardVariants = cva('flex h-fit w-full py-6', {
  variants: {
    variant: {
      default: 'flex-wrap container [&_.explain-area]:w-full',
    },
    componentArea: {
      'center-padding':
        '[&_.preview]:p-7 [&_.preview]:pt-3 [&_.preview]:justify-center [&_.preview]:items-center [&_.preview]:border-[var(--border-color-gray)] [&_.preview]:shadow-sm',
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
  isExampleOpen?: boolean;
}

export const ComponentExplainCard = ({
  title,
  description,
  variant,
  componentArea,
  isExampleOpen = false,
  className,
  children,
  ...props
}: ComponentExplainCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(isExampleOpen);
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
      {isOpen && (
        <div className='preview mt-8 flex min-h-[180px] w-full flex-col overflow-hidden rounded-md border'>
          <p
            className='item mb-6 cursor-pointer self-start justify-self-start font-medium text-red-300 underline-offset-4 hover:text-red-600 hover:underline'
            onClick={() => setIsOpen(false)}
          >
            예제 닫기
          </p>
          {children}
        </div>
      )}
      {!isOpen && (
        <div className='preview-control mt-8 flex h-fit w-full overflow-hidden rounded-md border px-7 py-3'>
          <p
            className='cursor-pointer font-medium text-blue-300 underline-offset-4 hover:text-blue-600 hover:underline'
            onClick={() => setIsOpen(true)}
          >
            예제 펼치기...
          </p>
        </div>
      )}
    </section>
  );
};
