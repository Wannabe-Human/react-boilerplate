import { HTMLAttributes } from 'react';
import { cn } from '@utils/tailwind';

export interface ImgBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
}

export const ImgBackground = ({
  className: propsClassName,
  src,
  ...props
}: ImgBackgroundProps) => {
  return (
    <section
      className={cn('relative flex overflow-hidden', propsClassName)}
      {...props}
    >
      <img
        className='absolute inset-0 z-0 h-full w-full object-cover'
        src={src}
      />
      <div className='z-10 flex h-full w-full'>{props.children}</div>
    </section>
  );
};
