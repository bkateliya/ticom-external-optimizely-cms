// ── Normalized event shape returned by the API ─────────────────────────

export interface NormalizedEvent {
  key: string;
  eventTitle: string;
  description: string;
  attendanceType: AttendanceTypeValue;
  eventType: EventTypeValue;
  imageUrl: string;
  imageAlt: string;
  eventStartDate: string | null;
  eventEndDate: string | null;
  location: string | null;
  region: string | null;
  languages: string[];
  ctaTitle: string;
  ctaURL: string;
  contentLocale: string;
}

// ── Value types (derived from CMS enum definitions) ────────────────────

export type EventTypeValue =
  "webinar" | "seminar" | "conference" | "trade-show";
export type AttendanceTypeValue = "in-person" | "online";
export type RegionValue = "north-america" | "emea" | "asia" | "online";
export type LanguageValue =
  | "english"
  | "german"
  | "japanese"
  | "korean"
  | "simplified-chinese"
  | "spanish"
  | "traditional-chinese";

// ── Display name maps ──────────────────────────────────────────────────

export const EVENT_TYPE_LABELS: Record<EventTypeValue, string> = {
  webinar: "Webinar",
  seminar: "Seminar",
  conference: "Conference",
  "trade-show": "Trade show",
};

export const ATTENDANCE_TYPE_LABELS: Record<AttendanceTypeValue, string> = {
  "in-person": "In person",
  online: "Online",
};

export const REGION_LABELS: Record<RegionValue, string> = {
  "north-america": "North America",
  emea: "EMEA",
  asia: "Asia",
  online: "Online",
};

export const LANGUAGE_LABELS: Record<LanguageValue, string> = {
  english: "English",
  german: "German",
  japanese: "Japanese",
  korean: "Korean",
  "simplified-chinese": "Simplified Chinese",
  spanish: "Spanish",
  "traditional-chinese": "Chinese Traditional",
};

export const CTA_LABELS: Record<string, string> = {
  register: "Register",
  "visit-event-website": "Visit event website",
  "learn-more": "Learn more",
  "watch-video": "Watch video",
};

// ── Facet types ────────────────────────────────────────────────────────

export interface FacetOption {
  value: string;
  displayName: string;
  count: number;
}

export interface FacetGroup {
  id: string;
  label: string;
  options: FacetOption[];
}

export type SelectedFacets = Record<string, Set<string>>;

// ── Date classification ────────────────────────────────────────────────

export function isUpcoming(event: NormalizedEvent): boolean {
  const now = new Date();
  const end = event.eventEndDate ? new Date(event.eventEndDate) : null;
  const start = event.eventStartDate ? new Date(event.eventStartDate) : null;

  if (end) return end >= now;
  if (start) return start >= now;
  return false;
}

export function isOnDemand(event: NormalizedEvent): boolean {
  return !isUpcoming(event) && event.eventType === "webinar";
}

// ── Sorting ────────────────────────────────────────────────────────────

function toTime(dateStr: string | null, fallback: number): number {
  return dateStr ? new Date(dateStr).getTime() : fallback;
}

export function sortUpcoming(events: NormalizedEvent[]): NormalizedEvent[] {
  return [...events].sort(
    (a, b) =>
      toTime(a.eventStartDate, Infinity) - toTime(b.eventStartDate, Infinity),
  );
}

export function sortPast(events: NormalizedEvent[]): NormalizedEvent[] {
  return [...events].sort(
    (a, b) => toTime(b.eventStartDate, 0) - toTime(a.eventStartDate, 0),
  );
}

// ── Pre-filter (author-configured, immutable at runtime) ───────────────

export function applyPreFilter(
  events: NormalizedEvent[],
  allowedTypes: string[] | null,
): NormalizedEvent[] {
  if (!allowedTypes || allowedTypes.length === 0) return events;
  const allowed = new Set(allowedTypes);
  return events.filter((e) => allowed.has(e.eventType));
}

// ── Facet computation ──────────────────────────────────────────────────

interface FacetConfig {
  id: string;
  label: string;
  displayNames: Record<string, string>;
  extract: (event: NormalizedEvent) => string[];
}

export const FACET_CONFIGS: FacetConfig[] = [
  {
    id: "eventType",
    label: "Event type",
    displayNames: EVENT_TYPE_LABELS,
    extract: (e) => [e.eventType],
  },
  {
    id: "attendanceType",
    label: "Event subtype",
    displayNames: ATTENDANCE_TYPE_LABELS,
    extract: (e) => [e.attendanceType],
  },
  {
    id: "region",
    label: "Location",
    displayNames: REGION_LABELS,
    extract: (e) => (e.region ? [e.region] : []),
  },
  {
    id: "language",
    label: "Language",
    displayNames: LANGUAGE_LABELS,
    extract: (e) => e.languages,
  },
];

export function computeFacets(
  events: NormalizedEvent[],
  visibleFacets?: string[] | null,
): FacetGroup[] {
  const configs = visibleFacets?.length
    ? FACET_CONFIGS.filter((c) => visibleFacets.includes(c.id))
    : FACET_CONFIGS;

  return configs.reduce<FacetGroup[]>((facets, config) => {
    const counts = new Map<string, number>();

    for (const event of events) {
      for (const val of config.extract(event)) {
        counts.set(val, (counts.get(val) ?? 0) + 1);
      }
    }

    if (counts.size > 1) {
      facets.push({
        id: config.id,
        label: config.label,
        options: Array.from(counts, ([value, count]) => ({
          value,
          displayName: config.displayNames[value] ?? value,
          count,
        })).sort((a, b) => a.displayName.localeCompare(b.displayName)),
      });
    }

    return facets;
  }, []);
}

// ── Facet filtering (within = OR, across = AND) ────────────────────────

const FACET_MATCHERS: Record<
  string,
  (event: NormalizedEvent, selected: Set<string>) => boolean
> = {
  eventType: (e, sel) => sel.has(e.eventType),
  attendanceType: (e, sel) => sel.has(e.attendanceType),
  region: (e, sel) => (e.region ? sel.has(e.region) : false),
  language: (e, sel) => e.languages.some((lang) => sel.has(lang)),
};

export function applyFacetFilters(
  events: NormalizedEvent[],
  selectedFacets: SelectedFacets,
): NormalizedEvent[] {
  const activeFacets = Object.entries(selectedFacets).filter(
    ([, values]) => values.size > 0,
  );

  if (activeFacets.length === 0) return events;

  return events.filter((event) =>
    activeFacets.every(([facetId, selected]) => {
      const matcher = FACET_MATCHERS[facetId];
      return matcher ? matcher(event, selected) : true;
    }),
  );
}
