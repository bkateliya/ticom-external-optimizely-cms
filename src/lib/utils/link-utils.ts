import type { UrlObject } from "node:url";
/**
 * Matches a protocol (e.g. http:, https:, ftp:, mailto:, etc.)
 */
const PROTOCOL_REGEX = /^[a-z][a-z0-9\+\-\.]+\:/i;

/**
 * Parse a url object or string into a UrlWithRelativePath that supports non-fully qualified urls
 * @param src The url to parse
 * @returns The parsed url
 */
export function parseUrlObject(
  src?: string | URL | UrlObject,
): UrlWithRelativePath | null {
  if (!src) {
    console.error("No src provided");
    return null;
  }
  if (src instanceof URL) {
    return src;
  }
  let href;
  if (typeof src === "object" && "href" in src && src.href) {
    href = src.href;
  } else if (typeof src === "string") {
    href = src;
  } else {
    console.error("Invalid src provided", src);
    return null;
  }
  try {
    const publicURL =
      (process.env.SITE_DOMAIN as string) || "https://example.com";

    const fullyQualifiedPublicURL = publicURL.startsWith("http")
      ? publicURL
      : `https://${publicURL}`;

    // If it's a fully qualified url, use it as is, otherwise include the public url

    if (href.match(PROTOCOL_REGEX)) return new URL(href);
    const urlWithDummyDomain = new URL(href, new URL(fullyQualifiedPublicURL));
    const removeLeadingSlash = href.startsWith("#") || href.startsWith("?");
    return new UrlWithRelativePath(urlWithDummyDomain, removeLeadingSlash);
  } catch (error) {
    console.error("Error parsing url", href, error);
    return null;
  }
}

/**
 * Checks if a url is external.  Note: We don't use window.location.origin because it's not available in the server side
 * and will cause hydration errors.
 * @param url The url to check
 * @returns True if the url is external, false otherwise
 */
export function isExternalUrl(url: string): boolean {
  const hasProtocol = !!url.match(PROTOCOL_REGEX);

  const publicURL = process.env.SITE_DOMAIN as string | undefined;

  // Preview deployments won't have a public url, so just check whether it has a protocol
  if (!publicURL && process.env.VERCEL_TARGET_ENV === "preview") {
    return hasProtocol;
  }
  return hasProtocol && !url.startsWith(publicURL ?? "");
}

/**
 * encodeURIComponent with single quotes as well so behavior
 * is consistent between Node and browsers. This fixes hydration errors.
 * @param str The string to encode
 * @returns The encoded string
 * @example
 * encodeURIComponentSafe("Hello 'world'!") // returns 'Hello%20%27world%27%21'
 */
export function encodeURIComponentSafe(str: string) {
  return encodeURIComponent(str).replace(/'/g, "%27");
}

export class UrlWithRelativePath {
  href: string;
  pathname: string;
  protocol: string;
  origin?: string;
  search: string;
  hash: string;

  constructor(url: URL, removeLeadingSlash: boolean = false) {
    this.href = url.href.replace(url.origin, "");
    if (removeLeadingSlash) {
      this.href = this.href.replace(/^\//, "");
    }
    this.pathname = url.pathname;
    this.protocol = "";
    this.search = url.search;
    this.hash = url.hash;
  }
  toString() {
    return this.href;
  }
  toJSON() {
    return this.href;
  }
}
