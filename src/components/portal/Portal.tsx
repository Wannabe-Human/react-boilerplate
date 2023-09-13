import { HTMLAttributes, useState } from 'react';
import { createPortal } from 'react-dom';
import { useInterval } from 'usehooks-ts';

const PORTAL_ID_LIST = ['navigation_area', 'extra_area'] as const;

export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
  portal_id: (typeof PORTAL_ID_LIST)[number];
}

export const Portal = ({ portal_id, ...props }: PortalProps) => {
  const [target, setTarget] = useState<HTMLElement>();

  useInterval(
    () => {
      const ele = document.getElementById(portal_id);

      if (ele) setTarget(ele);
    },
    target == undefined ? 40 : null,
  );

  if (target == undefined) return null;

  return createPortal(props.children, target);
};

export const PortalSection = ({ portal_id, ...props }: PortalProps) => {
  return <section {...props} id={portal_id}></section>;
};
