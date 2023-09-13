import Img404 from '@assets/imgs/common/404.png';

export const DefaultErrorBoundary = () => {
  return (
    <div className='container'>
      <img src={Img404} alt='' />
    </div>
  );
};
