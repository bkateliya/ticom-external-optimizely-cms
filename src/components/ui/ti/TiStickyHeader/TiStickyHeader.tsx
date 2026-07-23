import { CustomEventHandler } from "../Common/events";

export interface StickyHeaderEventDetail {
  sticky?: boolean;
}

export interface TiStickyHeaderProps extends React.PropsWithChildren {
  disableAnimation?: boolean;
  topContent?: React.ReactNode;
  tiStickyHeaderChange?: CustomEventHandler<StickyHeaderEventDetail>;
}

export function TiStickyHeader({
  disableAnimation,
  topContent,
  children,
}: TiStickyHeaderProps) {
  return (
    <ti-sticky-header disableAnimation={disableAnimation}>
      {topContent ? <div slot="top">{topContent}</div> : null}
      <div slot="bottom">{children}</div>
    </ti-sticky-header>
  );
}
