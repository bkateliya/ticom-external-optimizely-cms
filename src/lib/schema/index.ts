/**
 * Schema.org / JSON-LD structured data — core types and builders.
 *
 * Everything is derived in code from data a page already has (title,
 * description, image, publish metadata, URL) — there are no schema-specific CMS
 * fields. Which schemas a page emits is selected per page type in
 * `./registry` (schemaRegistry / buildPageSchemas).
 */

import { ArticlePageType } from "@/components/cms/pages/Article/Article.model";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/** Anything serializable as a JSON-LD node. */
export type JsonLdNode = Record<string, unknown>;

export interface ArticleSchema extends JsonLdNode {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description?: string;
  image?: string[];
  datePublished?: string;
  dateModified?: string;
  author?: { "@type": "Person" | "Organization"; name: string };
  mainEntityOfPage?: { "@type": "WebPage"; "@id": string };
}

export interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

export interface BreadcrumbListSchema extends JsonLdNode {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbItem[];
}

export interface WebSiteSchema extends JsonLdNode {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
}

/** A builder turns page content into one JSON-LD node, or `null` if N/A. */
export type SchemaBuilder = (content: SchemaContent) => JsonLdNode | null;

type InferredUrl = {
  default?: string | null;
  hierarchical?: string | null;
  base?: string | null;
};

/**
 * A contentReference (image). The SDK resolves the asset URL as
 * `url.default ?? item.Url`: CMS `_image` content puts the path in `url.default`,
 * while DAM assets leave it null and expose the URL at `item.Url`.
 */
type ImageRef = {
  url?: InferredUrl | null;
  item?: { Url?: string | null } | null;
} | null;

/**
 * Loose structural view of an Optimizely content object — only the existing
 * fields the schema is derived from, so this stays decoupled from any one
 * content type while remaining type-safe at the call sites.
 */
export type SchemaContent = {
  _metadata?: {
    displayName?: string | null;
    types?: string[] | null;
    locale?: string | null;
    published?: string | null;
    lastModified?: string | null;
    url?: InferredUrl | null;
  } | null;
  pageTitle?: string | null;
  /** Breadcrumb / navigation title override (SEO uses this for the last crumb). */
  navigationTitle?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: ImageRef;
  hero?: { image?: ImageRef } | null;
};

/* -------------------------------------------------------------------------- */
/* URL helpers                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Resolve a (possibly relative) path against a site base URL. Returns
 * `undefined` when there is nothing to resolve, or when a relative path has no
 * base — schema.org requires absolute URLs, so we omit the field rather than
 * emit a relative one (JSON.stringify drops `undefined`).
 */
function absoluteUrl(
  base: string | null | undefined,
  relative: string | null | undefined,
): string | undefined {
  if (!relative) return undefined;
  if (/^https?:\/\//i.test(relative)) return relative; // already absolute (e.g. DAM)
  if (!base) return undefined;
  return `${base.replace(/\/+$/, "")}${relative.startsWith("/") ? "" : "/"}${relative}`;
}

/** "our-latest-news" -> "Our Latest News" */
function humanizeSegment(segment: string): string {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* -------------------------------------------------------------------------- */
/* Path resolution                                                            */
/* -------------------------------------------------------------------------- */

/**
 * CMS-internal path segments the router injects that never appear in public
 * URLs. The [[...slug]] route rewrites public `/en/article/` to CMS
 * `/en/home/article/`, so "home" is dropped when reconstructing public URLs.
 */
const ROOT_SEGMENTS = new Set(["home"]);

function imageUrl(ref: ImageRef | undefined): string | null | undefined {
  return ref?.url?.default ?? ref?.item?.Url;
}

function relativePath(content: SchemaContent): string | undefined {
  const url = content._metadata?.url;
  return url?.hierarchical ?? url?.default ?? undefined;
}

/**
 * Convert the CMS hierarchical path into the public path structure: keep the
 * locale as the URL prefix, drop CMS-internal container segments ("home").
 */
function publicPathParts(
  content: SchemaContent,
): { localePrefix: string; segments: string[] } | null {
  const path = relativePath(content);
  if (!path) return null;

  const raw = path.split("/").filter(Boolean);
  if (raw.length === 0) return null;

  const locale = content._metadata?.locale?.toLowerCase();
  const hasLocale = !!locale && raw[0]?.toLowerCase() === locale;
  const localePrefix = hasLocale ? `/${raw[0]}` : "";
  const segments = (hasLocale ? raw.slice(1) : raw).filter(
    (s) => !ROOT_SEGMENTS.has(s.toLowerCase()),
  );
  return { localePrefix, segments };
}

/** Canonical public absolute URL of a piece of content. */
function canonicalUrl(content: SchemaContent): string | undefined {
  const parts = publicPathParts(content);
  if (!parts) return undefined;
  const rel = parts.segments.length
    ? `${parts.localePrefix}/${parts.segments.join("/")}/`
    : `${parts.localePrefix}/`;
  return absoluteUrl(content._metadata?.url?.base, rel);
}

function isArticle(content: SchemaContent): boolean {
  return content._metadata?.types?.includes(ArticlePageType.key) ?? false;
}

/* -------------------------------------------------------------------------- */
/* Builders                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * schema.org/Article — derived from existing fields: headline (metaTitle /
 * pageTitle), description (metaDescription), image (ogImage → hero), and dates
 * (CMS publish metadata). `author` is omitted (no page data); to add one,
 * source it from a code constant and set `author` below.
 */
export function buildArticleSchema(content: SchemaContent): ArticleSchema | null {
  if (!isArticle(content)) return null;

  const headline =
    content.metaTitle ||
    content.pageTitle ||
    content._metadata?.displayName ||
    undefined;
  if (!headline) return null;

  const base = content._metadata?.url?.base;
  const url = canonicalUrl(content);
  const image = absoluteUrl(
    base,
    imageUrl(content.ogImage) ?? imageUrl(content.hero?.image),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: content.metaDescription ?? undefined,
    image: image ? [image] : undefined,
    datePublished: content._metadata?.published ?? undefined,
    dateModified: content._metadata?.lastModified ?? undefined,
    mainEntityOfPage: url ? { "@type": "WebPage", "@id": url } : undefined,
  };
}

/**
 * schema.org/BreadcrumbList — derived from the content's hierarchical URL.
 * Requires an absolute site base (else omitted). The locale becomes the "Home"
 * crumb pointing at the locale root; CMS-internal "home" is dropped; the final
 * crumb is named from the page title / navigation override. Intermediate names
 * are humanized from the slug.
 */
export function buildBreadcrumbSchema(
  content: SchemaContent,
): BreadcrumbListSchema | null {
  const base = content._metadata?.url?.base;
  const parts = publicPathParts(content);
  if (!base || !parts) return null;

  const { localePrefix, segments } = parts;
  if (segments.length === 0) return null; // only home/root → no useful trail

  const lastName =
    content.navigationTitle ||
    content.pageTitle ||
    content._metadata?.displayName ||
    humanizeSegment(segments[segments.length - 1]);

  const itemListElement: BreadcrumbItem[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl(base, `${localePrefix}/`),
    },
  ];

  let acc = localePrefix;
  segments.forEach((segment, index) => {
    acc += `/${segment}`;
    itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      name:
        index === segments.length - 1 ? lastName : humanizeSegment(segment),
      item: absoluteUrl(base, `${acc}/`),
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

/**
 * schema.org/WebSite — for the site root / home page. Name is derived from the
 * page's title (swap to a brand constant or site setting if you have one); url
 * is the canonical locale-root URL. Returns null without an absolute base.
 *
 * Unlike buildArticleSchema this has no content-type guard — the registry
 * controls where it runs (register it only for the home/experience type).
 */
export function buildWebSiteSchema(content: SchemaContent): WebSiteSchema | null {
  const url = canonicalUrl(content);
  const name =
    content.metaTitle ||
    content.pageTitle ||
    content._metadata?.displayName ||
    undefined;
  if (!url || !name) return null;

  return { "@context": "https://schema.org", "@type": "WebSite", name, url };
}
