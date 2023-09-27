import { HTMLAttributes, useState } from 'react';

import { createPortal } from 'react-dom';
import { useInterval } from 'usehooks-ts';

const PORTAL_ID_LIST = ['navigation_area', 'extra_area'] as const;
const DIRTY_TEXT = '_ldaqogkpriwls'; // id가 겹치는 것을 방지하기 위한 추가 text
export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
  portal_id: (typeof PORTAL_ID_LIST)[number];
}

export const Portal = ({ portal_id, ...props }: PortalProps) => {
  const [target, setTarget] = useState<HTMLElement>();
  const limit = 2000;
  const [count, setCount] = useState<number>(limit);

  useInterval(
    () => {
      if (count > 0) console.error('portal 강제 실행 종료 : ', portal_id);
      const ele = document.getElementById(portal_id + DIRTY_TEXT);

      if (ele) {
        setTarget(ele);
      } else {
        setCount(count - 40);
      }
    },
    target == undefined && count > 0 ? 40 : null,
  );

  if (target == undefined) return null;

  return createPortal(props.children, target);
};

export const PortalSection = ({ portal_id, ...props }: PortalProps) => {
  return <section {...props} id={portal_id + DIRTY_TEXT}></section>;
};
