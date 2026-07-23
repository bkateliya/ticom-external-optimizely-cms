"use client";

import { CustomEventHandler, useEventListenerRef } from "../../Common/events";

/** Line path from the pin circle to its label. Any single or paired up/down/left/right. */
export type PinLinePath =
  | "up"
  | "down"
  | "left"
  | "right"
  | "up left"
  | "up right"
  | "down left"
  | "down right"
  | "left up"
  | "left down"
  | "right up"
  | "right down";

/** Detail payload for the `tiPinChange` event. */
export interface TiPinChangeEventDetail {
  /** Whether the pin is now selected. */
  selected: boolean;
}

/**
 * Wrapper for `ti-pin` — a positioned pin + label with a connector line, for use
 * inside a relatively-positioned container (e.g. a `TiImageMap`). The label is
 * passed as children.
 *
 * @example
 * <TiPin positionHorizontal="30%" positionVertical="36%" linePath="up right" href="//www.ti.com">
 *   HEV/EV inverter
 * </TiPin>
 */
export type TiPinProps = React.PropsWithChildren & {
  /** Horizontal position of the pin in its container, e.g. "30%". */
  positionHorizontal: string;
  /** Vertical position of the pin in its container, e.g. "36%". */
  positionVertical: string;
  /** Direction the connector line draws from the circle to the label. */
  linePath?: PinLinePath;
  /** Line height value (length of the vertical segment), e.g. "80px". */
  lineHeight?: string;
  /** Line width value (length of the horizontal segment), e.g. "60px". */
  lineWidth?: string;
  /** Link URL for the pin. */
  href?: string;
  /** Open the link in a new tab/window. Does nothing if `href` is empty. */
  target?: string;
  /** Selected modifier for the pin. */
  selected?: boolean;
  /** `data-lid` link id, required for metrics tracking. */
  dataLid?: string;
  /** `data-navtitle` link text, required for metrics tracking. */
  dataNavtitle?: string;
  /** Fired when the pin's selected state changes. */
  tiPinChange?: CustomEventHandler<TiPinChangeEventDetail>;
};

export function TiPin({
  positionHorizontal,
  positionVertical,
  linePath,
  lineHeight,
  lineWidth,
  href,
  target,
  selected,
  dataLid,
  dataNavtitle,
  tiPinChange,
  children,
}: TiPinProps): React.ReactNode {
  const ref = useEventListenerRef({
    tiPinChange: tiPinChange,
  });
  return (
    <ti-pin
      ref={ref}
      position-horizontal={positionHorizontal}
      position-vertical={positionVertical}
      line-path={linePath}
      line-height={lineHeight}
      line-width={lineWidth}
      href={href}
      target={target}
      selected={selected}
      data-lid={dataLid}
      data-navtitle={dataNavtitle}
    >
      {children}
    </ti-pin>
  );
}
