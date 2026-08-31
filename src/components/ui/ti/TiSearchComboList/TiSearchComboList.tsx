"use client";

import { useEffect } from "react";
import { HtmlElementProps } from "@/lib/ts/react";
import { CustomEventHandler, useEventListenerRef } from "../Common/events";

export interface TiSearchComboListSuggestion {
  key: string;
  label: string;
}

interface TiSearchComboListElement extends HTMLElement {
  suggestionList: readonly TiSearchComboListSuggestion[];
}

/** Detail payload for `tiSearchComboListSelect`. */
export interface TiSearchComboListSelectEventDetail {
  value: string;
  event: Event;
}

/** Detail payload for `tiSearchComboListBlur`. */
export interface TiSearchComboListBlurEventDetail {
  value: string;
}

/** Detail payload for `tiSearchComboListValueChange`. */
export interface TiSearchComboListValueChangeEventDetail {
  value: string;
  event: Event;
  eventType: "clear" | "type";
}

export interface TiSearchComboListProps extends HtmlElementProps {
  disabled?: boolean;
  /**
   * Options shown in the dropdown. Assigned as a DOM property on the
   * element (not an HTML attribute), since it's a list of objects.
   */
  suggestionList: readonly TiSearchComboListSuggestion[];
  /** Placeholder text. */
  placeholder?: string;
  /** The current value of the field. */
  value?: string;
  /* Event handlers */
  tiSearchComboListSelect?: CustomEventHandler<TiSearchComboListSelectEventDetail>;
  tiSearchComboListBlur?: CustomEventHandler<TiSearchComboListBlurEventDetail>;
  tiSearchComboListValueChange?: CustomEventHandler<TiSearchComboListValueChangeEventDetail>;
}

/**
 * Wrapper for the `ti-search-combolist` web component — a searchable
 * dropdown used to select a value from a list of suggestions (e.g.
 * countries).
 *
 * `suggestionList` is a DOM property on the element, not a HTML attribute, so
 * it is applied imperatively via the element ref rather than passed as JSX props.
 *
 * @example
 * <TiSearchComboList
 *   suggestionList={countries}
 *   value=""
 *   placeholder={t('search')}
 *   tiSearchComboListSelect={(e) => setSelectedCountry(e.detail?.value ?? null)}
 * />
 */
export function TiSearchComboList({
  disabled,
  suggestionList,
  placeholder,
  value,
  tiSearchComboListSelect,
  tiSearchComboListBlur,
  tiSearchComboListValueChange,
  ...props
}: TiSearchComboListProps): React.ReactNode {
  const ref = useEventListenerRef({
    tiSearchComboListSelect,
    tiSearchComboListBlur,
    tiSearchComboListValueChange,
  });

  // Update suggestionList when it changes
  // Need to do this via ref because it is an DOM property and not a HTML attribute
  useEffect(() => {
    const el = ref.current as TiSearchComboListElement | null;
    if (!el) return;
    el.suggestionList = suggestionList;
  }, [ref, suggestionList]);

  return (
    <ti-search-combolist
      ref={ref}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      {...props}
    ></ti-search-combolist>
  );
}
