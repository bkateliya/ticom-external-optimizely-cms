"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { tv } from "tailwind-variants";
import { TiTabContainer } from "@/components/ui/ti/TiTabContainer/TiTabContainer";
import { TiViewMore } from "@/components/ui/ti/TiViewMore/TiViewMore";
import useDeviceCheck from "@/components/utilities/ScreenUtilities";
import { EventCardList } from "./EventCard";
import { FacetFilters } from "./FacetFilters/FacetFilters";
import type { SelectedFacets } from "./FacetFilters/facet-filters.types";
import {
  type NormalizedEvent,
  isUpcoming,
  computeFacets,
  applyPreFilter,
  applyFacetFilters,
  sortUpcoming,
  sortPast,
} from "./events-result-list.types";

// ── Props ──────────────────────────────────────────────────────────────

interface TabConfig {
  tabId: string;
  title: string;
}

interface ViewMoreConfig {
  expandLabel: string;
  collapseLabel: string;
}

interface EventsResultListClientProps {
  locale: string;
  preFilterEventTypes: string[] | null;
  visibleFacets: string[];
  tabs: TabConfig[];
  viewMore: ViewMoreConfig;
}

// ── Constants ──────────────────────────────────────────────────────────

const FILTER_EVENTS_LABEL = "Filter events";

// ── Main component ─────────────────────────────────────────────────────

export function EventsResultListClient({
  locale,
  preFilterEventTypes,
  visibleFacets,
  tabs,
  viewMore,
}: EventsResultListClientProps) {
  const t = useTranslations();
  const [allEvents, setAllEvents] = useState<NormalizedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFacets, setSelectedFacets] = useState<SelectedFacets>({});
  // Resolves after mount, so the first paint uses the desktop height.
  const { isMobile } = useDeviceCheck();
  // Live `ti-view-more` on the events overview; cards stack on phones, where
  // the desktop height would show far more rows before the fold.
  const VIEW_MORE_COLLAPSED_HEIGHT = isMobile ? 700 : 900;

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/events?locale=${encodeURIComponent(locale)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<NormalizedEvent[]>;
      })
      .then((data) => {
        setAllEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load events");
        setLoading(false);
      });

    return () => controller.abort();
  }, [locale]);

  const preFilteredEvents = useMemo(
    () => applyPreFilter(allEvents, preFilterEventTypes),
    [allEvents, preFilterEventTypes],
  );

  const facets = useMemo(
    () => computeFacets(preFilteredEvents, visibleFacets),
    [preFilteredEvents, visibleFacets],
  );

  const filteredEvents = useMemo(
    () => applyFacetFilters(preFilteredEvents, selectedFacets),
    [preFilteredEvents, selectedFacets],
  );

  const upcomingEvents = useMemo(
    () => sortUpcoming(filteredEvents.filter(isUpcoming)),
    [filteredEvents],
  );

  const pastEvents = useMemo(
    () =>
      sortPast(filteredEvents.filter((e: NormalizedEvent) => !isUpcoming(e))),
    [filteredEvents],
  );

  const handleFacetChange = useCallback(
    (facetId: string, value: string, checked: boolean) => {
      setSelectedFacets((prev: SelectedFacets) => {
        const updated = new Set(prev[facetId]);
        if (checked) {
          updated.add(value);
        } else {
          updated.delete(value);
        }
        return { ...prev, [facetId]: updated };
      });
    },
    [],
  );

  if (loading) {
    return <EventsLoadingSkeleton />;
  }

  if (error) {
    return null;
  }

  const upcomingTab = tabs.find((t) => t.tabId === "upcoming");
  const pastTab = tabs.find((t) => t.tabId === "past");

  const viewMoreProps = {
    collapsedHeight: VIEW_MORE_COLLAPSED_HEIGHT,
    expandActionLabel: viewMore.expandLabel,
    collapseActionLabel: viewMore.collapseLabel,
  };

  const renderList = (events: NormalizedEvent[]) => (
    <TiViewMore {...viewMoreProps}>
      <EventCardList events={events} locale={locale} />
    </TiViewMore>
  );

  return (
    <div className={layout()}>
      {facets.length > 0 && (
        <FacetFilters
          facets={facets}
          selectedFacets={selectedFacets}
          onFacetChange={handleFacetChange}
          refineByLabel={t("Refine by")}
          filterActionLabel={FILTER_EVENTS_LABEL}
        />
      )}

      <div className="min-w-0 flex-1 md:mt-7">
        <TiTabContainer
          selectedTabId="upcoming"
          hashSelection
          tabs={[
            {
              tabId: "upcoming",
              title: upcomingTab?.title ?? "Upcoming",
              content: renderList(upcomingEvents),
            },
            {
              tabId: "past",
              title: pastTab?.title ?? "Past",
              content: renderList(pastEvents),
            },
          ]}
        />
      </div>
    </div>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────────

function EventsLoadingSkeleton() {
  return (
    <div className={skeleton()} aria-busy="true">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className={skeletonCard()} />
      ))}
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────

const TAILWIND_VARIANTS = tv(
  {
    slots: {
      layout: "flex flex-col gap-8 md:flex-row md:gap-14",
      skeleton: "flex animate-pulse flex-col gap-4",
      skeletonCard: "h-[212px] bg-pl-container-background-color-secondary",
    },
  },
  { twMerge: false },
);
const { layout, skeleton, skeletonCard } = TAILWIND_VARIANTS();
