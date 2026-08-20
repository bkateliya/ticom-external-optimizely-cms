export interface TiSideNavProps extends React.PropsWithChildren {
  menuTitle?: string;
  ariaLabel?: string;
  dataLid?: string;
  autoPopulate?: boolean;
}

export function TiSideNav({
  menuTitle,
  ariaLabel,
  dataLid = "vertical-chapter-nav",
  autoPopulate,
  children,
}: TiSideNavProps) {
  return (
    <ti-side-nav
      chapter-menu={true}
      auto-populate={autoPopulate}
      ti-aria-label={ariaLabel}
      data-lid={dataLid}
      className="ti_p-layout-space-small"
    >
      {menuTitle ? <div slot="menu-title">{menuTitle}</div> : null}

      <style>{`ti-navbar[data-lid="fixed_nav"] { display: none !important; }`}</style>
      {children}
    </ti-side-nav>
  );
}
