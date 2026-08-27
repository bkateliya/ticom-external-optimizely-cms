"use client";

import { useCallback, useEffect, useRef } from "react";
import { CustomEventHandler } from "../Common/events";
import { TiSearchFieldChangeEventDetail } from "./TiSearchField";

/**
 * Wires a {@link TiSearchField}'s search button and Enter key onto one `search`
 * callback. Returns the props to spread onto the field.
 */
export function useSearchFieldSubmit(search: (term: string) => void) {
  const fieldRef = useRef<HTMLElement>(null);

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

  // The submit event covers the search button but not Enter.
  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;

      // keyup bubbles from the clear button too — only the input may search.
      const origin = event.composedPath()[0];
      const innerControl = origin instanceof HTMLElement && origin !== el;
      if (innerControl && !(origin instanceof HTMLInputElement)) return;

      // A closed shadow root hides the origin; there, a blank term means the
      // clear button ran on keydown.
      const term = readValue().trim();
      if (!term) return;

      search(term);
    };

    el.addEventListener("keyup", onKeyUp);
    return () => el.removeEventListener("keyup", onKeyUp);
  }, [search, readValue]);

  return { elementRef: fieldRef, tiSearchFieldSubmit: handleSubmit };
}
