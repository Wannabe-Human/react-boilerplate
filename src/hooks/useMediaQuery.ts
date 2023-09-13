import { GLOBAL } from '@utils/tailwindUtills';
import { useMediaQuery as query } from 'usehooks-ts';

type ContainerMediaType = 'mobile' | 'sm' | 'md' | 'lg' | 'xl';
type mediaType = 'curr' | 'less' | 'more' | '';

export const useMediaQuery = () => {
  const SCREENS = {
    sm: Number(GLOBAL('screen.sm').value) + 120 * 2,
    md: Number(GLOBAL('screen.md').value) + 120 * 2,
    lg: Number(GLOBAL('screen.lg').value) + 120 * 2,
    xl: Number(GLOBAL('screen.xl').value) + 120 * 2,
  };
  const SM = query(`(min-width: ${SCREENS['sm']}px)`);
  const MD = query(`(min-width: ${SCREENS['md']}px)`);
  const LG = query(`(min-width: ${SCREENS['lg']}px)`);
  const XL = query(`(min-width: ${SCREENS['xl']}px)`);

  const isMedia = (width: ContainerMediaType, type?: mediaType): boolean => {
    const mediaType: mediaType = type ?? 'less';

    if (mediaType == 'curr') {
      // 정확히 일치
      switch (width) {
        case 'mobile':
          return !SM;
        case 'sm':
          return SM && !MD;
        case 'md':
          return MD && !LG;
        case 'lg':
          return LG && !XL;
        case 'xl':
          return XL;
      }
    }
    if (mediaType == 'less') {
      // 더 작으면
      switch (width) {
        case 'mobile':
          return !SM;
        case 'sm':
          return !MD;
        case 'md':
          return !LG;
        case 'lg':
          return !XL;
        case 'xl':
          return true; //항상
      }
    }
    if (mediaType == 'more') {
      // 더 크면
      switch (width) {
        case 'mobile':
          return true; //항상
        case 'sm':
          return SM;
        case 'md':
          return MD;
        case 'lg':
          return LG;
        case 'xl':
          return XL;
      }
    }
    return true;
  };

  return {
    isMedia,
  };
};
