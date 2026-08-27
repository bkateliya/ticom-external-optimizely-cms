"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  TiSearchField,
  TiSearchFieldChangeEventDetail,
} from "@/components/ui/ti/TiSearchField/TiSearchField";
import { CustomEventHandler } from "@/components/ui/ti/Common/events";

export interface BrowseVideosSearchInputProps {
  /** Placeholder text for the field. */
  placeholder?: string;
  /**
   * Video search endpoint, already carrying its `preFilter` — the encoded term
   * is appended as `&searchTerm=`, e.g.
   * `//www.ti.com/sitesearch/en-us/docs/universalsearch.tsp?langPref=en-US&preFilter=videos_Video,Video%20series`.
   */
  baseUrl: string;
  /** Optional class names forwarded to the underlying field. */
  className?: string;
}

/**
 * Client wrapper around {@link TiSearchField} that redirects to TI's universal
 * search, pre-filtered to videos, when the user submits a search — via the
 * search button (`tiSearchFieldSubmit`) or by pressing Enter.
 *
 * Mirrors {@link FAQSearchInput}: the Coveo search box the reference markup
 * uses is replaced by a plain redirect.
 */
export function BrowseVideosSearchInput({
  placeholder,
  baseUrl,
  className,
}: BrowseVideosSearchInputProps) {
  const fieldRef = useRef<HTMLElement>(null);

  const search = useCallback(
    (term: string) => {
      const query = term.trim();
      // Nothing to search for — e.g. the field was just cleared.
      if (!query) return;
      window.open(
        `${baseUrl}&searchTerm=${encodeURIComponent(query)}`,
        "_self",
      );
    },
    [baseUrl],
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
