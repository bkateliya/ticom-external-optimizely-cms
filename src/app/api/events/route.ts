import "@/lib/opti/client-config";
import { getClient } from "@optimizely/cms-sdk";
import { NextRequest } from "next/server";
import {
  COMMON_PAGINATION_FILTER,
  COMMON_PAGINATION_QUERY,
  getPaginatedResults,
  ResultWithKey,
} from "@/lib/graphql/graph-utils";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  toGraphLocale,
} from "@/constants/locales";
import type { NormalizedEvent } from "@/components/cms/components/EventsResultList/events-result-list.types";

// ── GraphQL queries ────────────────────────────────────────────────────

const EVENTS_QUERY = `query(${COMMON_PAGINATION_QUERY}) {
  data: TI_Event_Component(${COMMON_PAGINATION_FILTER}) {
    items {
      _metadata { key, locale }
      eventTitle
      description { html }
      attendanceType
      eventType
      image { key, url { graph } }
      eventStartDate
      eventEndDate
      location
      region
      language
      ctaTitle
      ctaURL { url { default } }
    }
    cursor
  }
}`;

const BYNDER_IMAGE_QUERY = `query GetBynderImages($imageIds: [String]) {
  BynderImage(ids: $imageIds) {
    items {
      id
      original
      transformBaseUrl
      property_alt_text
    }
  }
}`;

// ── Types ──────────────────────────────────────────────────────────────

interface EventGraphResult extends ResultWithKey {
  _metadata: { key: string; locale: string };
  eventTitle: string;
  description: { html: string } | null;
  attendanceType: string;
  eventType: string;
  image: { key: string; url: { graph: string } } | null;
  eventStartDate: string | null;
  eventEndDate: string | null;
  location: string | null;
  region: string | null;
  language: string | string[] | null;
  ctaTitle: string;
  ctaURL: { url: { default: string } } | null;
}

interface BynderImageItem {
  id: string;
  original: string;
  transformBaseUrl: string;
  property_alt_text: string;
}

// ── Constants ──────────────────────────────────────────────────────────

const CACHE_CONTROL =
  "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

const BYNDER_IMAGE_PREFIX = "/BynderImage/";

// ── Helpers ────────────────────────────────────────────────────────────

const normalizeLocale = (value: string) =>
  value.toLowerCase().replace(/_/g, "-");

function parseBynderId(graphUrl: string | undefined): string | null {
  if (!graphUrl) return null;
  const idx = graphUrl.indexOf(BYNDER_IMAGE_PREFIX);
  return idx >= 0 ? graphUrl.slice(idx + BYNDER_IMAGE_PREFIX.length) : null;
}

function normalizeLanguageField(value: string | string[] | null): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Groups events by `_metadata.key` and picks the version matching the
 * preferred locale. Falls back to the master language (en-US), then to
 * the first available version.
 */
function deduplicateByLocale(
  events: EventGraphResult[],
  preferredLocale: string,
): EventGraphResult[] {
  const grouped = new Map<string, EventGraphResult[]>();

  for (const event of events) {
    const existing = grouped.get(event._metadata.key);
    if (existing) {
      existing.push(event);
    } else {
      grouped.set(event._metadata.key, [event]);
    }
  }

  const preferred = preferredLocale.toLowerCase();
  const master = toGraphLocale(DEFAULT_LOCALE).toLowerCase();

  return Array.from(grouped.values(), (versions) => {
    const byLocale = (loc: string) =>
      versions.find((v) => v._metadata.locale.toLowerCase() === loc);

    return byLocale(preferred) ?? byLocale(master) ?? versions[0];
  });
}

/**
 * Batch-resolves Bynder image metadata for events that have a Bynder image ref.
 */
async function resolveBynderImages(
  events: EventGraphResult[],
): Promise<Map<string, BynderImageItem>> {
  const idSet = new Set<string>();
  for (const e of events) {
    const id = parseBynderId(e.image?.url?.graph);
    if (id) idSet.add(id);
  }

  if (idSet.size === 0) return new Map();

  try {
    const client = getClient();
    const result = (await client.request(BYNDER_IMAGE_QUERY, {
      imageIds: [...idSet],
    })) as { BynderImage: { items: BynderImageItem[] } };

    return new Map(result.BynderImage.items.map((img) => [img.id, img]));
  } catch (error) {
    console.error("Failed to resolve Bynder images for events", error);
    return new Map();
  }
}

function toNormalizedEvent(
  event: EventGraphResult,
  bynderMap: Map<string, BynderImageItem>,
): NormalizedEvent {
  const bynderId = parseBynderId(event.image?.url?.graph);
  const bynder = bynderId ? bynderMap.get(bynderId) : undefined;

  return {
    key: event._metadata.key,
    eventTitle: event.eventTitle ?? "",
    description: event.description?.html ?? "",
    attendanceType: event.attendanceType as NormalizedEvent["attendanceType"],
    eventType: event.eventType as NormalizedEvent["eventType"],
    imageUrl: bynder?.transformBaseUrl || bynder?.original || "",
    imageAlt: bynder?.property_alt_text || "",
    eventStartDate: event.eventStartDate ?? null,
    eventEndDate: event.eventEndDate ?? null,
    location: event.location ?? null,
    region: event.region ?? null,
    languages: normalizeLanguageField(event.language),
    ctaTitle: event.ctaTitle ?? "",
    ctaURL: event.ctaURL?.url?.default ?? "",
    contentLocale: event._metadata.locale,
  };
}

// ── Route handler ──────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const localeParam = request.nextUrl.searchParams.get("locale");
  const appLocale = localeParam ? normalizeLocale(localeParam) : DEFAULT_LOCALE;

  if (!SUPPORTED_LOCALES.includes(appLocale)) {
    return Response.json({ message: "Unsupported locale" }, { status: 400 });
  }

  try {
    const allEvents = await getPaginatedResults<EventGraphResult>(EVENTS_QUERY);

    const deduped = deduplicateByLocale(allEvents, toGraphLocale(appLocale));
    const bynderMap = await resolveBynderImages(deduped);
    const normalized = deduped.map((e) => toNormalizedEvent(e, bynderMap));

    return Response.json(normalized, {
      headers: { "Cache-Control": CACHE_CONTROL },
    });
  } catch (error) {
    console.error("Failed to fetch events", error);
    return Response.json(
      { message: "Failed to fetch events" },
      { status: 500 },
    );
  }
}
