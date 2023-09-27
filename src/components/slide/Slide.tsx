import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import 'swiper/css';
// 핵심 Swiper 스타일만
import 'swiper/css/bundle';
import * as swiperModules from 'swiper/modules';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from 'swiper/react';

//모든 모듈 스타일 사용
// import 'swiper/css/a11y'; // A11y 모듈에 필요한 스타일
// import 'swiper/css/autoplay'; // 자동 재생 모듈에 필요한 스타일
// import 'swiper/css/controller'; // 컨트롤러 모듈에 필요한 스타일
// import 'swiper/css/effect'; //cards- 카드 효과 모듈에 필요한 스타일
// import 'swiper/css/effect'; //coverflow- Coverflow Effect 모듈에 필요한 스타일
// import 'swiper/css/effect'; //creative- Creative Effect 모듈에 필요한 스타일
// import 'swiper/css/effect'; //cube- Cube Effect 모듈에 필요한 스타일
// import 'swiper/css/effect'; //fade- 페이드 효과 모듈에 필요한 스타일
// import 'swiper/css/effect'; //flip- Flip Effect 모듈에 필요한 스타일
// import 'swiper/css/free'; //mode- 자유 모드 모듈에 필요한 스타일
// import 'swiper/css/grid'; // 그리드 모듈에 필요한 스타일
// import 'swiper/css/hash'; //navigation- 해시 탐색 모듈에 필요한 스타일
// import 'swiper/css/history'; // 기록 모듈에 필요한 스타일
// import 'swiper/css/keyboard'; // 키보드 모듈에 필요한 스타일
// import 'swiper/css/manipulation'; // 조작 모듈에 필요한 스타일
// import 'swiper/css/mousewheel'; // 마우스휠 모듈에 필요한 스타일
// import 'swiper/css/navigation'; // 탐색 모듈에 필요한 스타일
// import 'swiper/css/pagination'; // 페이지 매김 모듈에 필요한 스타일
// import 'swiper/css/parallax'; // Parallax 모듈에 필요한 스타일
// import 'swiper/css/scrollbar'; // 스크롤바 모듈에 필요한 스타일
// import 'swiper/css/thumbs'; // Thumbs 모듈에 필요한 스타일
// import 'swiper/css/virtual'; // 가상 모듈에 필요한 스타일
// import 'swiper/css/zoom'; // Zoom 모듈에 필요한 스타일

interface SlideElement extends React.HTMLAttributes<HTMLElement> {
  swiper: SwiperClass;
}

type SwiperModule = typeof swiperModules.A11y;

//swiper module option 도 같이 추가되어야함
const matchModule: { [key: string]: SwiperModule } = {
  a11y: swiperModules.A11y,
  autoplay: swiperModules.Autoplay,
  controller: swiperModules.Controller,
  coverflowEffect: swiperModules.EffectCoverflow,
  cubeEffect: swiperModules.EffectCube,
  fadeEffect: swiperModules.EffectFade,
  flipEffect: swiperModules.EffectFlip,
  creativeEffect: swiperModules.EffectCreative,
  cardsEffect: swiperModules.EffectCards,
  hashNavigation: swiperModules.HashNavigation,
  history: swiperModules.History,
  keyboard: swiperModules.Keyboard,
  mousewheel: swiperModules.Mousewheel,
  navigation: swiperModules.Navigation,
  pagination: swiperModules.Pagination,
  parallax: swiperModules.Parallax,
  scrollbar: swiperModules.Scrollbar,
  thumbs: swiperModules.Thumbs,
  virtual: swiperModules.Virtual,
  zoom: swiperModules.Zoom,
  freeMode: swiperModules.FreeMode,
  grid: swiperModules.Grid,
};

const moduleIdList: string[] = Object.keys(matchModule);

export interface SlideProps extends SwiperProps {}

export const Slide = forwardRef<SwiperClass, SlideProps>(
  ({ children, ...props }, ref) => {
    const swiperRef = useRef<SlideElement>(null);
    const [itemChildren, setItemChildren] = useState<ReactNode[]>([]);

    useImperativeHandle(
      ref,
      () => {
        return {
          ...swiperRef.current?.swiper,

          // 모든 이벤트 리스너 다시 연결
          // attachEvents: () => swiperRef.current?.swiper.attachEvents(),

          // 슬라이더 방향을 수평/수직으로 변경, 미입력시 기존값과 반대로 변경
          changeDirection: (
            direction?: 'horizontal' | 'vertical' | undefined,
            needUpdate?: boolean | undefined, //swiper.update() 호출
          ) => swiperRef.current?.swiper.changeDirection(direction, needUpdate),

          // 슬라이더 언어 변경
          changeLanguageDirection: (direction: 'rtl' | 'ltr') =>
            swiperRef.current?.swiper.changeLanguageDirection(direction),

          // 슬라이더 인스턴스 삭제 및 이벤트 리스너 분리
          destroy: (
            deleteInstance?: boolean | undefined,
            cleanStyles?: boolean | undefined,
          ) => swiperRef.current?.swiper.destroy(deleteInstance, cleanStyles),

          // 모든 이벤트 리스너 분리
          // detachEvents: () => swiperRef.current?.swiper.detachEvents(),

          //다음 슬라이드로 전환을 실행합니다.
          slideNext: (
            speed?: number | undefined, //전환 속도 ms
            runCallbacks?: boolean | undefined, // 전환 이벤트 콜벡
          ) => swiperRef.current?.swiper.slideNext(speed, runCallbacks),

          //이전 슬라이드로 전환을 실행합니다
          slidePrev: (
            speed?: number | undefined, //전환 속도 ms
            runCallbacks?: boolean | undefined, // 전환 이벤트 콜벡
          ) => swiperRef.current?.swiper.slidePrev(speed, runCallbacks),

          // index 로 이동
          slideTo: (
            index: number, //타겟 index
            speed?: number | undefined, //전환 속도 ms
            runCallbacks?: boolean | undefined, // 전환 이벤트 콜벡
          ) => swiperRef.current?.swiper.slideTo(index, speed, runCallbacks),

          // 슬라이더 초기화
          init: () => swiperRef.current?.swiper.init(),

          // 슬라이더 업데이트, 슬라이드를 수동으로 추가/제거 후, 호출하면 반영된다
          update: () => swiperRef.current?.swiper.update(),
        } as any;
      },
      [swiperRef],
    );

    const defaultProps: SwiperProps = useMemo(
      () => ({
        slidesPerView: 'auto',
      }),
      [],
    );

    const options: SwiperProps = useMemo(() => {
      //props 통합
      const integratedProps = {
        ...defaultProps,
        ...props,
      };

      //추가 모듈
      const moduleList: SwiperModule[] = [];

      //props 에서 언급된 모듈 추가
      Object.entries(integratedProps)
        .filter(([key]) => moduleIdList.includes(key))
        .forEach(([key]) => {
          moduleList.push(matchModule[key]);
        });

      return {
        modules: moduleList,
        ...integratedProps,
      };
    }, [defaultProps, props]);

    useEffect(() => {
      if (children == undefined) {
        setItemChildren([]);
      }

      if (typeof children == 'object' && Array.isArray(children)) {
        setItemChildren(children);
      }

      if (typeof children == 'object' && !Array.isArray(children)) {
        setItemChildren([children]);
      }
    }, [children]);

    return (
      <Swiper ref={swiperRef} {...options}>
        {itemChildren.length == 0 && (
          <SwiperSlide>
            <div className='flex h-full w-full items-center justify-center'>
              빈 슬라이드
            </div>
          </SwiperSlide>
        )}
        {itemChildren.length != 0 &&
          itemChildren.map((item, i) => {
            return <SwiperSlide key={`slide-${i}`}>{item}</SwiperSlide>;
          })}
      </Swiper>
    );
  },
);

Slide.displayName = 'Slide';
