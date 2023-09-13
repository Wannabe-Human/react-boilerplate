import { Background } from '@components/section/Background';

export const MainPage = () => {
  return (
    <Background
      id='content1'
      className='text-white'
      // bgImgSrc={ImgBgMainFire}
      animation='fade-up'
      times='once'
      easing='in-out'
    ></Background>
  );
};
