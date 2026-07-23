"use client";

import { HtmlElementProps } from "@/lib/ts/react";
import { CustomEventHandler, useEventListenerRef } from "../Common/events";

export interface PaginationChangeEventDetail {
  itemsPerPage: number;
  page: number;
  totalPages: number;
}

export interface TiPaginationProps extends HtmlElementProps {
  totalItems: number;
  onPaginationPageChange: CustomEventHandler<PaginationChangeEventDetail>;
  currentPage?: number;
  itemsPerPage?: number;
  paginationAriaLabel?: string;
  paginationOptions?: number[];
  resultsLabel?: string;
  showResultsUi?: boolean;
}
export function TiPagination({
  currentPage,
  onPaginationPageChange,
  totalItems,
  itemsPerPage,
  paginationAriaLabel,
  paginationOptions,
  resultsLabel,
  showResultsUi,
}: TiPaginationProps) {
  const ref = useEventListenerRef({
    tiPaginationPageChange: onPaginationPageChange,
  });
  return (
    <ti-pagination
      ref={ref}
      total-items={totalItems}
      items-per-page={itemsPerPage}
      current-page={currentPage}
      show-results-ui={showResultsUi}
      pagination-aria-label={paginationAriaLabel}
      results-label={resultsLabel}
      pagination-options={`[${paginationOptions?.join(",")}]`}
    ></ti-pagination>
  );
}
