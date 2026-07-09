/**
 * Centralized mock data for CtaLink unit tests.
 */

export const SITE_HOST = 'mysite.com';
export const SITE_ORIGIN = `https://${SITE_HOST}`;

export const URLS = {
  external: 'https://external.com/page',
  externalFile: 'https://external.com/file.pdf',
  internal: `${SITE_ORIGIN}/page`,
} as const;

export const TARGETS = {
  newTab: '_blank',
  self: '_self',
  customNamed: 'myWindow',
} as const;

export const makeUrl = (href: string) => new URL(href, SITE_ORIGIN);
