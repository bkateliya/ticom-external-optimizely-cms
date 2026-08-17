export interface TiNavbarProps {
  centered?: boolean;
  scrollOffset?: number;
  pageWidth?: string;
  dataLid?: string;
  /** Marks this navbar as a page's primary header nav rather than a chapter/TOC nav. */
  header?: boolean;
  stickyMarginBottom?: number;
  /** Read by the component instead of a plain `aria-label`. */
  ariaLabel?: string;
}

export function TiNavbar({
  centered = true,
  scrollOffset = 56,
  pageWidth = "1240px",
  dataLid,
  header,
  stickyMarginBottom,
  ariaLabel,
}: TiNavbarProps) {
  return (
    <ti-navbar
      centered={centered}
      scroll-offset={scrollOffset}
      page-width={pageWidth}
      data-lid={dataLid}
      header={header}
      sticky-margin-bottom={stickyMarginBottom}
      ti-aria-label={ariaLabel}
    />
  );
}
