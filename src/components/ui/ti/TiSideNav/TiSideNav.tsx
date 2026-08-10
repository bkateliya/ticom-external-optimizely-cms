export interface TiSideNavProps extends React.PropsWithChildren {
  menuTitle?: string;
  ariaLabel?: string;
  dataLid?: string;
}

export function TiSideNav({
  menuTitle,
  ariaLabel,
  dataLid = "vertical-chapter-nav",
  children,
}: TiSideNavProps) {
  return (
    <ti-side-nav
      chapter-menu={true}
      ti-aria-label={ariaLabel}
      data-lid={dataLid}
      className="ti_p-layout-space-small"
    >
      {menuTitle ? <div slot="menu-title">{menuTitle}</div> : null}
      {/* chapter-menu mode auto-generates its own fallback navbar; we render
     our own ti-sticky-header + ti-navbar instead, so suppress it. */}

      <style>{`ti-navbar[data-lid="fixed_nav"] { display: none !important; }`}</style>
      {children}
    </ti-side-nav>
  );
}
