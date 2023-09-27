import { HTMLAttributes } from 'react';

import { CSSVariables, cn } from '@utils/tailwind';

export interface HexBeehiveViewProps extends HTMLAttributes<HTMLDivElement> {
  itemList: {
    imgSrc?: string;
  }[];
  hexHeight?: number; //0~100
  hexAngle?: number; //0~100
  gap?: number;
  lineLimit?: number; //1줄에 최대로 들어갈 수 있는 길이
}

export const HexBeehiveView = ({
  className,
  gap = 2,
  hexHeight = 100,
  hexAngle = 100,
  itemList,
  lineLimit = 5,
  ...props
}: HexBeehiveViewProps) => {
  return (
    <section
      style={CSSVariables({
        grid: {
          'repeat-cols': `${lineLimit}`,
          'gap': `${gap * 2}px`,
          'even-rows': {
            offset: `${gap}px`,
          },
        },
        hex: {
          height: `${0.5 + hexHeight / 500}`,
          angle: `${1.3 + hexAngle / 450}`,
        },
      })}
      className={cn('grid-cols-repeat-custom grid gap-[--grid-gap]', className)}
      {...props}
    >
      {itemList.map((item, i) => {
        const isEven = Math.floor(i / lineLimit) % 2 == 1; // 짝수번째 줄의 item 일 경우
        return (
          <div
            key={`item-hex-${i}`}
            className={cn(
              'invisible relative w-full after:block after:pb-[calc(calc(100%*var(--hex-height))+calc(10%*calc(var(--hex-angle)-1)))] after:content-[""]',
            )}
          >
            <div
              className={cn(
                'rotate-3d-hex-rhombus invisible absolute top-0 w-full overflow-hidden pb-[100%]',
                lineLimit % 2 == 1
                  ? isEven
                    ? 'left-[calc(50%+var(--grid-even-rows-offset))]'
                    : ''
                  : isEven
                  ? 'left-[calc(25%+var(--grid-even-rows-offset))]'
                  : 'left-[calc(-25%)]',
              )}
            >
              <div className='rotate-3d-hex-rhombus-reverse visible absolute z-40 flex h-full w-full items-center justify-center overflow-hidden'>
                <img className='h-full w-full object-cover' src={item.imgSrc} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
