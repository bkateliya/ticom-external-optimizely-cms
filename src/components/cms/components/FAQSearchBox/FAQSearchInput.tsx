"use client";

import { useCallback } from "react";
import { TiSearchField } from "@/components/ui/ti/TiSearchField/TiSearchField";
import { useSearchFieldSubmit } from "@/components/ui/ti/TiSearchField/useSearchFieldSubmit";

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
  const search = useCallback(
    (term: string) => {
      const query = encodeURIComponent(term.trim());
      window.open(`${baseUrl}${query}&preFilter=support_${preFilter}`, "_self");
    },
    [baseUrl, preFilter],
  );

  const submitProps = useSearchFieldSubmit(search);

  return (
    <TiSearchField
      {...submitProps}
      className={className}
      placeholder={placeholder}
    />
  );
}
