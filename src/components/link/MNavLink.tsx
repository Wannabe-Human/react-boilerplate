import { useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Link,
  LinkProps,
  useLocation,
  useResolvedPath,
} from 'react-router-dom';
import { cn } from '@utils/tailwind';

const MNavLinkVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

export interface MNavLinkProps
  extends LinkProps,
    VariantProps<typeof MNavLinkVariants> {
  isActiveClassName: (isActive: boolean) => string;
  end?: boolean; //포함 관계 제외
  hash?: boolean; //hash 비교 활성화
  rootInclude?: boolean;
}

const MNavLink = ({
  className,
  isActiveClassName,
  to,
  end = false,
  hash = false,
  rootInclude = false,
  ...props
}: MNavLinkProps) => {
  const loaction = useLocation();
  const resolvedPath = useResolvedPath(to);

  const isActive = useMemo(() => {
    //포함 관계 확인
    if (loaction.pathname.startsWith(resolvedPath.pathname)) {
      if (resolvedPath.pathname == '/' && !rootInclude) return false;
      if (end && loaction.pathname != resolvedPath.pathname) return false;
      if (hash && loaction.hash != resolvedPath.hash) return false;
      return true;
    } else {
      return false;
    }
  }, [resolvedPath, loaction, end, hash, rootInclude]);

  return (
    <Link
      to={to}
      className={cn(className, isActiveClassName(isActive))}
      {...props}
    />
  );
};
MNavLink.displayName = 'MNavLink';

export { MNavLink, MNavLinkVariants };
