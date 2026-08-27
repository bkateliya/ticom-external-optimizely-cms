"use client";

import { HtmlElementProps } from "@/lib/ts/react";
import { TiComponentPropsBase } from "../Common/base";
import { CustomEventHandler, useEventListenerRef } from "../Common/events";

/** Detail payload for `tiChange` / `tiFocus` / `tiBlur`. */
export interface TiSearchFieldChangeEventDetail {
  /** The current value of the search field. */
  value: string;
  /**
   * True when the value reverts to a previous value, e.g. when backspace is
   * used to erase characters. Only present on `tiChange`.
   */
  reverted?: boolean;
}

export interface TiSearchFieldProps
  extends HtmlElementProps,
    TiComponentPropsBase {
  /** Regular or large field. Defaults to `regular`. */
  appearance?: "regular" | "large";
  /** Disabled state of the input. Defaults to false. */
  disabled?: boolean;
  /** Placeholder text. Defaults to `Search`. */
  placeholder?: string;
  /** Select the text content when the field is focused. */
  selectOnFocus?: boolean;
  /** Render the field's clear ("X") button. */
  hasClearbutton?: boolean;
  /** The value of the search. */
  value?: string;
  /** Fired on every change to the value of the field. */
  tiChange?: CustomEventHandler<TiSearchFieldChangeEventDetail>;
  /** Fired when the field gains focus. */
  tiFocus?: CustomEventHandler<TiSearchFieldChangeEventDetail>;
  /** Fired when the field loses focus. */
  tiBlur?: CustomEventHandler<TiSearchFieldChangeEventDetail>;
  /** Fired when the search button is clicked / the search is submitted. */
  tiSearchFieldSubmit?: CustomEventHandler<TiSearchFieldChangeEventDetail>;
  /**
   * Optional ref to the underlying `ti-search-field` element, e.g. to attach a
   * native `keyup` listener or call `clearSearch()` / `select()`.
   */
  elementRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Wrapper for the `ti-search-field` web component — a text entry field styled
 * for search / filter / auto-complete use.
 *
 * Because attaching event listeners requires a client component, pass the
 * `tiChange` / `tiSearchFieldSubmit` handlers from a `"use client"` parent.
 *
 * @example
 * <TiSearchField
 *   placeholder="Search"
 *   tiSearchFieldSubmit={(e) => router.push(`?q=${e.detail?.value ?? ""}`)}
 * />
 */
export function TiSearchField({
  appearance,
  disabled,
  placeholder,
  selectOnFocus,
  hasClearbutton,
  value,
  tiChange,
  tiFocus,
  tiBlur,
  tiSearchFieldSubmit,
  tiMetricsAction,
  elementRef,
  ...props
}: TiSearchFieldProps): React.ReactNode {
  const ref = useEventListenerRef(
    {
      tiChange,
      tiFocus,
      tiBlur,
      tiSearchFieldSubmit,
      tiMetricsAction,
    },
    elementRef,
  );

  return (
    <ti-search-field
      ref={ref}
      appearance={appearance}
      disabled={disabled}
      placeholder={placeholder}
      select-on-focus={selectOnFocus}
      has-clearbutton={hasClearbutton}
      value={value}
      {...props}
    ></ti-search-field>
  );
}
