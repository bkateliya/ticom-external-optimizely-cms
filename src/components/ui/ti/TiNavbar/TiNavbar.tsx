export interface TiNavbarProps {
  centered?: boolean;
  scrollOffset?: number;
  pageWidth?: string;
  dataLid?: string;
}

export function TiNavbar({
  centered = true,
  scrollOffset = 56,
  pageWidth = "1240px",
  dataLid,
}: TiNavbarProps) {
  return (
    <ti-navbar
      centered={centered}
      scroll-offset={scrollOffset}
      page-width={pageWidth}
      data-lid={dataLid}
    />
  );
}
