"use client";

import { useCallback } from "react";
import { TiSearchField } from "@/components/ui/ti/TiSearchField/TiSearchField";
import { useSearchFieldSubmit } from "@/components/ui/ti/TiSearchField/useSearchFieldSubmit";

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
  const search = useCallback(
    (term: string) => {
      const query = encodeURIComponent(term.trim());
      window.open(`${baseUrl}&searchTerm=${query}`, "_self");
    },
    [baseUrl],
  );

  const submitProps = useSearchFieldSubmit(search);

  return (
    <TiSearchField
      {...submitProps}
      className={className}
      placeholder={placeholder}
      hasClearbutton={true}
    />
  );
}
