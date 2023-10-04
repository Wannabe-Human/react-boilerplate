import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { useInView } from 'react-intersection-observer';
import { SwiperClass } from 'swiper/react';

import { Slide, SlideProps } from '@components/slide/Slide';

import { cn } from '@utils/tailwind/cn';
import { CSSVariables } from '@utils/tailwind/cssVariables';

export interface ListSlideProps extends SlideProps {
  id: string;
}

export const ListSlide = forwardRef<SwiperClass, ListSlideProps>(
  ({ children, className, id, ...props }, ref) => {
    const slideRef = useRef<SwiperClass>(null);
    useImperativeHandle(ref, () => slideRef.current!, [slideRef]);
    const [inRef, trigger] = useInView();

    useEffect(() => {
      if (slideRef) {
        if (trigger) {
          slideRef.current?.autoplay.resume();
        } else {
          slideRef.current?.autoplay.pause();
        }
      }
    }, [trigger, slideRef]);

    return (
      <div
        ref={inRef}
        className={cn('relative flex h-full w-full', className)}
        id={id}
      >
        {/* 
        // 투명 그라데이션을 넣기 위해 사용했던 코드
        <div className='absolute left-0 top-0 z-20 hidden h-full bg-gradient-to-l from-transparent from-0% to-gray-200 to-70% md:flex md:w-14 lg:w-32 xl:w-72' />
        <div className='rom-0% m absolute right-0 top-0 z-20 hidden h-full bg-gradient-to-r from-transparent to-gray-200 to-70% md:flex md:w-14 lg:w-32 xl:w-72' /> */}
        <Slide
          style={CSSVariables({})}
          className='w-full [&_.sample-slider_.swiper-wrapper]:ease-linear'
          resistance={true}
          loop={true}
          loopedSlides={2}
          centeredSlides
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true, // 마우스 hover 시 일시정지
            disableOnInteraction: false,
          }}
          speed={1200}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 30,
            },
            //반응형
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 40,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          autoHeight //자동 높이
          ref={slideRef}
          {...props}
        >
          {children}
          {/**
             * 
             * 아이템 코드 예시
             * 
              <div
                key={`media_item_${i}`}
                className='mx-auto flex h-fit w-[minmax(calc(100vw/5.3)_,_360px)] max-w-[360px] flex-col items-center space-y-5'
              >
                <div className=' relative flex w-full overflow-hidden rounded-sm rounded-t-full pt-[127%]'>
                  <img
                    className='absolute inset-0 w-full object-contain'
                    src={item.imgSrc}
                  />
                </div>
                <div className='w-full'>
                  <h4>{item.subTitle}</h4>
                </div>
              </div>
             */}
        </Slide>
      </div>
    );
  },
);

ListSlide.displayName = 'Slide';
