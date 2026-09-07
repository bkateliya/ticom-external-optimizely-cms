"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { TiTabContainer } from "@/components/ui/ti/TiTabContainer/TiTabContainer";
import { TiViewMore } from "@/components/ui/ti/TiViewMore/TiViewMore";
import {
  type NormalizedEvent,
  type FacetGroup,
  type SelectedFacets,
  isUpcoming,
  isOnDemand,
  computeFacets,
  applyPreFilter,
  applyFacetFilters,
  sortUpcoming,
  sortPast,
  ATTENDANCE_TYPE_LABELS,
  EVENT_TYPE_LABELS,
  CTA_LABELS,
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

const VIEW_MORE_COLLAPSED_HEIGHT = 700;

// ── Main component ─────────────────────────────────────────────────────

export function EventsResultListClient({
  locale,
  preFilterEventTypes,
  visibleFacets,
  tabs,
  viewMore,
}: EventsResultListClientProps) {
  const [allEvents, setAllEvents] = useState<NormalizedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFacets, setSelectedFacets] = useState<SelectedFacets>({});

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

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      {facets.length > 0 && (
        <FacetSidebar
          facets={facets}
          selectedFacets={selectedFacets}
          onFacetChange={handleFacetChange}
        />
      )}

      <div className="flex-1">
        <TiTabContainer
          selectedTabId="upcoming"
          hashSelection
          tabs={[
            {
              tabId: "upcoming",
              title: upcomingTab?.title ?? "Upcoming",
              content: (
                <TiViewMore {...viewMoreProps}>
                  <EventList events={upcomingEvents} />
                </TiViewMore>
              ),
            },
            {
              tabId: "past",
              title: pastTab?.title ?? "Past",
              content: (
                <TiViewMore {...viewMoreProps}>
                  <EventList events={pastEvents} />
                </TiViewMore>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

// ── Facet sidebar ──────────────────────────────────────────────────────

function FacetSidebar({
  facets,
  selectedFacets,
  onFacetChange,
}: {
  facets: FacetGroup[];
  selectedFacets: SelectedFacets;
  onFacetChange: (facetId: string, value: string, checked: boolean) => void;
}) {
  return (
    <aside className="w-full shrink-0 md:w-[260px]">
      <p className="text-body-lg mb-4 font-medium">Refine by</p>
      <div className="flex flex-col gap-4">
        {facets.map((facet) => (
          <FacetGroupPanel
            key={facet.id}
            facet={facet}
            selected={selectedFacets[facet.id] ?? new Set()}
            onChange={onFacetChange}
          />
        ))}
      </div>
    </aside>
  );
}

function FacetGroupPanel({
  facet,
  selected,
  onChange,
}: {
  facet: FacetGroup;
  selected: Set<string>;
  onChange: (facetId: string, value: string, checked: boolean) => void;
}) {
  return (
    <fieldset className="rounded border border-pl-border-color-tertiary p-4">
      <legend className="text-body-md mb-3 font-semibold">{facet.label}</legend>
      <ul className="flex flex-col gap-2" role="list">
        {facet.options.map((option) => (
          <li key={option.value}>
            <label className="flex cursor-pointer items-center gap-2 text-body-md">
              <input
                type="checkbox"
                checked={selected.has(option.value)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(facet.id, option.value, e.target.checked)
                }
                className="h-4 w-4"
              />
              {option.displayName}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

// ── Event list ─────────────────────────────────────────────────────────

function EventList({ events }: { events: NormalizedEvent[] }) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {events.map((event) => (
        <EventCardPlaceholder key={event.key} event={event} />
      ))}
    </div>
  );
}

/**
 * Placeholder card -- full UI (image, date formatting, badges) to be
 * implemented in a follow-up. Renders enough data to verify the logic.
 */
function EventCardPlaceholder({ event }: { event: NormalizedEvent }) {
  const showOnDemand = isOnDemand(event);
  const typeLabel = EVENT_TYPE_LABELS[event.eventType] ?? event.eventType;
  const attendanceLabel =
    ATTENDANCE_TYPE_LABELS[event.attendanceType] ?? event.attendanceType;

  return (
    <div className="flex gap-4 border-b border-pl-border-color-tertiary pb-6">
      {/* TODO: full event card UI */}
      <div className="flex-1">
        <p className="text-caption mb-1 uppercase tracking-wide">
          {typeLabel}
          {showOnDemand ? " | On demand" : ` | ${attendanceLabel}`}
        </p>
        <p className="text-body-lg font-medium">{event.eventTitle}</p>
        {event.ctaURL && (
          <a
            href={event.ctaURL}
            className="text-body-sm text-pl-link-color-primary"
          >
            {CTA_LABELS[event.ctaTitle] ?? event.ctaTitle}
          </a>
        )}
      </div>
    </div>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────────

function EventsLoadingSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4" aria-busy="true">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className="h-32 rounded bg-pl-container-background-color-secondary"
        />
      ))}
    </div>
  );
}
