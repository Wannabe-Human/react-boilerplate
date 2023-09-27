import { HTMLAttributes, useEffect, useRef, useState } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@utils/tailwind';

const animationVariants = cva('', {
  variants: {
    animation: {
      'none': 'animate-none',
      'fade': 'animate-fade',
      'fade-up': 'animate-fade-up',
      'fade-down': 'animate-fade-down',
      'fade-left': 'animate-fade-left',
      'fade-right': 'animate-fade-right',
      'flip-up': 'animate-flip-up',
      'flip-down': 'animate-flip-down',
    },
    times: {
      once: 'animate-once',
      twice: 'animate-twice',
      thrice: 'animate-thrice',
      infinite: 'animate-infinite',
    },
    easing: {
      'linear': 'animate-ease-linear',
      'in': 'animate-ease-in',
      'out': 'animate-ease-out',
      'in-out': 'animate-ease-in-out',
    },
  },
  defaultVariants: {
    animation: 'none',
    times: 'infinite',
    easing: 'linear',
  },
});

export interface BackgroundProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof animationVariants> {
  bgImgSrc?: string;
}

export const Background = ({
  className: propsClassName,
  animation,
  times,
  easing,
  bgImgSrc,
  ...props
}: BackgroundProps) => {
  const animationClass = animationVariants({ animation, times, easing });
  const ref = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    if (animation != 'none' || animation != undefined || animation != null) {
      const handleScroll = () => {
        if (
          (animation != 'none' ||
            animation != undefined ||
            animation != null) &&
          ref &&
          ref.current
        ) {
          if (
            !trigger &&
            ref.current.getBoundingClientRect().top <=
              (window.innerHeight || document.documentElement.clientHeight) /
                1.5
          )
            setTrigger(true);

          if (
            trigger &&
            ref.current.getBoundingClientRect().top >=
              (window.innerHeight || document.documentElement.clientHeight)
          )
            setTrigger(false);
        }
      };

      document.addEventListener('scroll', handleScroll);

      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }
  }, [ref, trigger, animation, props.id]);

  return (
    <section
      className={cn('relative flex overflow-hidden', propsClassName)}
      ref={ref}
      {...props}
    >
      {bgImgSrc && (
        <img
          className='absolute inset-0 z-0 h-full w-full object-cover'
          src={bgImgSrc}
        />
      )}
      <div
        className={cn(
          'z-10 flex h-full w-full',
          trigger ? animationClass : 'invisible',
        )}
      >
        {props.children}
      </div>
    </section>
  );
};
