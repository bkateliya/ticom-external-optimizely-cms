export interface TiSideNavItemProps extends React.PropsWithChildren {
  href: string;
  navTitle?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function TiSideNavItem({ href, navTitle, active, onClick, children }: TiSideNavItemProps) {
  return (
    <ti-side-nav-item
      href={href}
      data-navtitle={navTitle}
      active={active || undefined}
      onClick={onClick}
    >
      {children}
    </ti-side-nav-item>
  );
}
