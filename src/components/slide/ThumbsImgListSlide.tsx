import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import SwiperCore from 'swiper';
import { SwiperClass } from 'swiper/react';

import { Slide, SlideProps } from '@components/slide/Slide';

import { cn } from '@utils/tailwind/cn';
import { CSSVariables } from '@utils/tailwind/cssVariables';

export interface ThumbsImgListSlideProps extends SlideProps {
  id: string;
  imgSrcList: string[];
  imgItemClassName?: string;
  thumbsWidth?: string;
  thumbsHeight?: string;
}

export const ThumbsImgListSlide = forwardRef<
  SwiperClass,
  ThumbsImgListSlideProps
>(
  (
    {
      className,
      id,
      imgSrcList,
      imgItemClassName,
      thumbsWidth,
      thumbsHeight,
      ...props
    },
    ref,
  ) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
    const slideRef = useRef<SwiperClass>(null);
    const THUMBS_LIMIT = 5;
    useImperativeHandle(ref, () => slideRef.current!, [slideRef]);

    return (
      <div
        className={cn('relative flex h-full w-full flex-col', className)}
        id={id}
      >
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
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          resistanceRatio={0}
          slidesPerView={1} //1개씩 보여줌
          autoHeight //자동 높이
          ref={slideRef}
          {...props}
        >
          {imgSrcList.map((src, i) => {
            return (
              <img
                className={cn(
                  'h-[350px] w-full object-cover lg:h-[650px]',
                  imgItemClassName,
                )}
                src={src}
                key={`item-view-${i}`}
              />
            );
          })}
        </Slide>
        <Slide
          slidesPerView={
            imgSrcList.length > THUMBS_LIMIT ? THUMBS_LIMIT : imgSrcList.length
          }
          spaceBetween={4}
          thumbs={{}}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          className={cn(
            `w-[calc(min(calc(100%/var(--slide-thumbs-length)),var(--slide-thumbs-width))*var(--slide-thumbs-length))]`,
            '[&_.swiper-slide-thumb-active_img]:border-2 [&_.swiper-slide-thumb-active_img]:border-red-400 [&_.swiper-slide-thumb-active_img]:opacity-100',
          )}
          style={CSSVariables({
            slide: {
              thumbs: {
                width: thumbsWidth ? thumbsWidth : '60px',
                height: thumbsHeight ? thumbsHeight : '60px',
                length: `${
                  imgSrcList.length > THUMBS_LIMIT
                    ? THUMBS_LIMIT
                    : imgSrcList.length
                }`,
              },
            },
          })}
        >
          {imgSrcList.map((src, i) => {
            return (
              <img
                className={cn(
                  'h-[var(--slide-thumbs-height)] w-[var(--slide-thumbs-width)] cursor-pointer object-cover opacity-50',
                  imgItemClassName,
                )}
                src={src}
                key={`item-thumbs-${i}`}
              />
            );
          })}
        </Slide>
      </div>
    );
  },
);

ThumbsImgListSlide.displayName = 'Slide';
