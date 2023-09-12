import { useState, useEffect } from 'react';

export const useScrollHeight = (height?: number) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      setIsFixed(scrollY >= (height || window.innerHeight));
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [height]);

  return isFixed;
};
