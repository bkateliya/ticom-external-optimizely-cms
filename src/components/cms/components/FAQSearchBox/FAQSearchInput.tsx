"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  TiSearchField,
  TiSearchFieldChangeEventDetail,
} from "@/components/ui/ti/TiSearchField/TiSearchField";
import { CustomEventHandler } from "@/components/ui/ti/Common/events";

export interface FAQSearchInputProps {
  /** Placeholder text for the field. */
  placeholder?: string;
  /**
   * Search endpoint up to and including the `searchTerm=%00` placeholder — the
   * encoded term is appended directly, e.g.
   * `/sitesearch/en-us/docs/universalsearch.tsp?langPref=en-US&nr=25&searchTerm=%00`.
   */
  baseUrl: string;
  /** Value appended after `&preFilter=support_` (the localized `data-translate`). */
  preFilter: string;
  /** Optional class names forwarded to the underlying field. */
  className?: string;
}

/**
 * Client wrapper around {@link TiSearchField} that redirects to TI's universal
 * search when the user submits a search — via the search button
 * (`tiSearchFieldSubmit`) or by pressing Enter.
 *
 * Mirrors the reference handler:
 *   url = baseUrl + encodeURIComponent(term) + "&preFilter=support_" + preFilter
 *   window.open(url, "_self")
 */
export function FAQSearchInput({
  placeholder,
  baseUrl,
  preFilter,
  className,
}: FAQSearchInputProps) {
  const fieldRef = useRef<HTMLElement>(null);

  const search = useCallback(
    (term: string) => {
      const query = term.trim();
      // Nothing to search for — e.g. the field was just cleared.
      if (!query) return;
      window.open(
        `${baseUrl}${encodeURIComponent(query)}&preFilter=support_${preFilter}`,
        "_self",
      );
    },
    [baseUrl, preFilter],
  );

  // Read the current value directly off the web component.
  const readValue = useCallback(
    () =>
      (fieldRef.current as (HTMLElement & { value?: string }) | null)?.value ??
      "",
    [],
  );

  // Search button click.
  const handleSubmit: CustomEventHandler<TiSearchFieldChangeEventDetail> =
    useCallback(
      (event) => search(event.detail?.value ?? readValue()),
      [search, readValue],
    );

  // The submit event covers the search button but not Enter, so add a native
  // keyup listener on the element for that (matches the reference behavior).
  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.isComposing) return;
      // Shadow-DOM events bubble out of the host, so Enter on the clear or
      // search button lands here too — only the text input submits.
      if (!(event.composedPath()[0] instanceof HTMLInputElement)) return;
      search(readValue());
    };

    el.addEventListener("keyup", onKeyUp);
    return () => el.removeEventListener("keyup", onKeyUp);
  }, [search, readValue]);

  return (
    <TiSearchField
      elementRef={fieldRef}
      className={className}
      placeholder={placeholder}
      tiSearchFieldSubmit={handleSubmit}
    />
  );
}
