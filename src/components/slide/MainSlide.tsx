import { forwardRef, useImperativeHandle, useRef } from 'react';

import { SwiperClass } from 'swiper/react';

import { Slide, SlideProps } from '@components/slide/Slide';

import { cn } from '@utils/tailwind/cn';
import { CSSVariables } from '@utils/tailwind/cssVariables';

export interface MainSlideProps extends SlideProps {
  id: string;
}

export const MainSlide = forwardRef<SwiperClass, MainSlideProps>(
  ({ children, className, id, ...props }, ref) => {
    const slideRef = useRef<SwiperClass>(null);
    useImperativeHandle(ref, () => slideRef.current!, [slideRef]);

    return (
      <div className={cn('relative flex h-full w-full', className)} id={id}>
        <Slide
          style={CSSVariables({})}
          className='w-full'
          resistance={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          effect='fade'
          fadeEffect={{
            crossFade: true,
          }}
          allowTouchMove={false}
          resistanceRatio={0}
          slidesPerView={1}
          autoHeight //자동 높이
          ref={slideRef}
          {...props}
        >
          {children}
          {/**
           * 아이템의 active 상태를 감지하여 css 수정하기 위한 예시 className
           *
           * [.swiper-slide-active_&]:[tailwind class name]
           */}
        </Slide>
      </div>
    );
  },
);

MainSlide.displayName = 'Slide';
