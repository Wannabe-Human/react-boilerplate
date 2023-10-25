import { ComponentExplainCard } from '@components/view/ComponentExplainCard';
import { HexBeehiveView } from '@components/view/HexBeehiveView';

import ImgItemMedia1 from '@assets/imgs/sample/item_media_1.png';
import ImgItemMedia2 from '@assets/imgs/sample/item_media_2.png';
import ImgItemMedia3 from '@assets/imgs/sample/item_media_3.jpg';
import ImgItemMedia4 from '@assets/imgs/sample/item_media_4.jpg';
import ImgItemMedia5 from '@assets/imgs/sample/item_media_5.jpg';
import ImgItemMedia6 from '@assets/imgs/sample/item_media_6.jpg';
import ImgItemMedia7 from '@assets/imgs/sample/item_media_7.jpg';
import ImgItemMedia8 from '@assets/imgs/sample/item_media_8.jpg';
import ImgItemMedia9 from '@assets/imgs/sample/item_media_9.jpg';

export const HexBeehiveViewSample = () => {
  return (
    <ComponentExplainCard
      title='육각벌집리스트 (HexBeehiveView)'
      description={
        '이미지를 육각형으로 가공하여 마치 벌집처럼 배치합니다.\n현재는 이미지만 보여주는 기능밖에 없지만, hover 이벤트, 텍스트 삽입등의 기능 추가도 가능하게끔 설계되어 있습니다.'
      }
    >
      <HexBeehiveView
        className='w-4/5 pb-16'
        gap={6}
        hexHeight={100}
        hexAngle={100}
        itemList={[
          { imgSrc: ImgItemMedia1 },
          { imgSrc: ImgItemMedia2 },
          { imgSrc: ImgItemMedia3 },
          { imgSrc: ImgItemMedia4 },
          { imgSrc: ImgItemMedia5 },
          { imgSrc: ImgItemMedia6 },
          { imgSrc: ImgItemMedia7 },
          { imgSrc: ImgItemMedia8 },
          { imgSrc: ImgItemMedia9 },
        ]}
      />
    </ComponentExplainCard>
  );
};
