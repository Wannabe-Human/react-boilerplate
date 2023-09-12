import { useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  offset: number; // header 높이값 만큼 제외하고 스크롤 가능하게하는 옵션
}

/**
 * Link tag 로 url 이동할 때, id 값을 기반으로 움직일 수 있도록 자동화 시키는 hook
 *
 * 기타
 * - plugin:react-router-dom 활용 hook
 * - RootLayout 에서 1회만 선언하여 활용
 * @param param0
 */
export const useRootRouterScrollToHash = ({ offset }: Props) => {
  const location = useLocation();
  const [key, setKey] = useState<string>();

  const hashElement = useMemo(() => {
    const hash = location.hash;
    setKey(location.key);

    const removeHashCharacter = (str: string) => {
      const result = str.slice(1);
      return result;
    };

    if (hash) {
      return document.getElementById(removeHashCharacter(hash));
    } else {
      return null;
    }
  }, [location]);

  useEffect(() => {
    if (hashElement) {
      const elementPosition = hashElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [hashElement, offset, key]);
};
