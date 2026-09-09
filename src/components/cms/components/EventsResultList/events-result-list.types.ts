import type {
  FacetGroup,
  SelectedFacets,
} from "./FacetFilters/facet-filters.types";

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

export const ON_DEMAND_LABEL = "On demand";

// ── Facet types (owned by FacetFilters, re-exported for convenience) ───

export type {
  FacetOption,
  FacetGroup,
  SelectedFacets,
} from "./FacetFilters/facet-filters.types";

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

// ── Date / time formatting ─────────────────────────────────────────────

// AEM authored the calendar date, the clock time and the zone label as three
// separate fields ("08:30 a.m." + "CST (UTC-05:00)"). The CMS has one dateTime
// instead, so everything is read back in UTC: shifting to a display zone would
// move date-only events onto the wrong calendar day.
const EVENT_TIME_ZONE = "UTC";
const EVENT_TIME_ZONE_LABEL = "UTC";

function parseDate(value: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function partsOf(
  date: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions,
) {
  const parts = new Intl.DateTimeFormat(locale, {
    timeZone: EVENT_TIME_ZONE,
    ...options,
  }).formatToParts(date);

  return (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
}

// "14 Sep 2026" — assembled by part because the live site is day-first in every
// locale, while Intl would reorder for en-US.
function formatDate(date: Date, locale: string): string {
  const part = partsOf(date, locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return `${part("day")} ${part("month")} ${part("year")}`;
}

/** "14 Sep 2026 – 18 Sep 2026", collapsed to a single date when they match. */
export function formatEventDateRange(
  event: NormalizedEvent,
  locale: string,
): string | null {
  const start = parseDate(event.eventStartDate);
  const end = parseDate(event.eventEndDate);

  if (!start) return end ? formatDate(end, locale) : null;

  const startLabel = formatDate(start, locale);
  if (!end) return startLabel;

  const endLabel = formatDate(end, locale);
  return endLabel === startLabel ? startLabel : `${startLabel} – ${endLabel}`;
}

/**
 * "08:30 a.m. UTC". Null at midnight — that is how a date-only event arrives,
 * and AEM printed no clock row unless a time was authored.
 */
export function formatEventTime(
  event: NormalizedEvent,
  locale: string,
): string | null {
  const start = parseDate(event.eventStartDate);
  if (!start) return null;

  const part = partsOf(start, locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const hour = part("hour");
  const minute = part("minute");

  const midnight = partsOf(start, "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  if (midnight("hour") === "00" && midnight("minute") === "00") return null;

  // TI writes the meridiem with periods; Intl gives "AM"/"PM".
  const dayPeriod = part("dayPeriod");
  const meridiem = /^[AP]\.?M\.?$/i.test(dayPeriod)
    ? `${dayPeriod[0].toLowerCase()}.m.`
    : dayPeriod;

  return `${hour.padStart(2, "0")}:${minute} ${meridiem} ${EVENT_TIME_ZONE_LABEL}`;
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
