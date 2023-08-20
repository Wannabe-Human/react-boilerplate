import Img404 from '../assets/imgs/common/404.png';

export const RootErrorBoundary = () => {
  return (
    <div>
      <img src={Img404} alt="" />
    </div>
  );
}