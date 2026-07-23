"use client";

import { CustomEventHandler, useEventListenerRef } from "../Common/events";

/** Detail payload for the `tiViewMoreChange` event. */
export interface TiViewMoreChangeEventDetail {
  /** Whether the content is now expanded. */
  isExpanded: boolean;
}

/**
 * Wrapper for `ti-view-more` — collapses a tall block of content behind a
 * "View more / View less" control. The content goes in as children (the
 * component's single default slot).
 *
 * `locale` is intentionally not exposed — it is deprecated upstream; use
 * `expandActionLabel` / `collapseActionLabel` for localized labels instead.
 *
 * @example
 * <TiViewMore>
 *   <h2>Title</h2>
 *   <p>Long content that could use hiding…</p>
 * </TiViewMore>
 *
 * // "Item mode" — collapsedHeight={0} shows/hides a group of items with no fade:
 * <TiViewMore collapsedHeight={0}>
 *   <div>Item 6</div>
 *   <div>Item 7</div>
 * </TiViewMore>
 */
export type TiViewMoreProps = React.PropsWithChildren & {
  /**
   * Collapsed-state height in pixels. Defaults to 260 (~10 lines).
   * Set to 0 for "item mode" — removes the fade/top margin so it can show/hide
   * a list of items below an always-visible section.
   */
  collapsedHeight?: number;
  /** Start expanded instead of collapsed. */
  isExpanded?: boolean;
  /** Use a centered full-width button as the control instead of the text link. */
  useButton?: boolean;
  /** Label for the expand control (collapsed state). */
  expandActionLabel?: string;
  /** Label for the collapse control (expanded state). */
  collapseActionLabel?: string;
  /** Aria-label for the expand control. */
  expandAriaLabel?: string;
  /** Aria-label for the collapse control. */
  collapseAriaLabel?: string;
  /** Fired when the content is expanded or collapsed. */
  tiViewMoreChange?: CustomEventHandler<TiViewMoreChangeEventDetail>;
};

export function TiViewMore({
  collapsedHeight,
  isExpanded,
  useButton,
  expandActionLabel,
  collapseActionLabel,
  expandAriaLabel,
  collapseAriaLabel,
  tiViewMoreChange,
  children,
}: TiViewMoreProps): React.ReactNode {
  const ref = useEventListenerRef({
    tiViewMoreChange: tiViewMoreChange,
  });
  return (
    <ti-view-more
      ref={ref}
      collapsed-height={collapsedHeight}
      is-expanded={isExpanded}
      use-button={useButton}
      expand-action-label={expandActionLabel}
      collapse-action-label={collapseActionLabel}
      expand-aria-label={expandAriaLabel}
      collapse-aria-label={collapseAriaLabel}
    >
      {children}
    </ti-view-more>
  );
}
