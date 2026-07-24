// This is in separate file so it can be imported from either client or server

import { DEFAULT_LOCALE } from "@/constants/locales";

// Base URL for TI's @ticom asset host. Sourced from the environment so it can
// be swapped per deployment (int vs. prod: https://www.ti.com/assets/js/@ticom).
// Must be NEXT_PUBLIC_ since this file is imported client-side.
export const TICOM =
  process.env.NEXT_PUBLIC_TICOM_BASE_URL ??
  "https://www-int.itg.ti.com/assets/js/@ticom";

// Global header stylesheet, served from the same @ticom host (no locale segment).
export const GLOBAL_HEADER_CSS = `${TICOM}/header-content/1.latest/style/ticom.global.header.css`;

export const MODULE_BUNDLES = [
  `${TICOM}/ui-components/3.latest/ui-components.esm.js`,
  `${TICOM}/header-components/3.latest/header-components.esm.js`,
  `${TICOM}/feature-components/2.4.18/feature-components.esm.js`,
  `${TICOM}/selection-tool-components/1.latest/selection-tool-components.esm.js`,
  `${TICOM}/personalization-components/0.0.41/personalization-components.esm.js`,
];

// header-content is published under a TI-specific path segment that isn't the
// full locale: en-us → "en", es-mx → "mx". Map the ones we know; fall back to
// the language code (which is correct for en-us) for anything unmapped.
const HEADER_CONTENT_SEGMENT: Record<string, string> = {
  "en-us": "en",
  "es-mx": "mx",
  "zh-cn": "cn",
  "zh-tw": "tw",
  "de-de": "de",
  "ja-jp": "jp",
  "ko-kr": "kr"
};

export const headerContentSegment = (locale: string | undefined) => {
  const loc = locale ?? DEFAULT_LOCALE;
  return HEADER_CONTENT_SEGMENT[loc] ?? loc.split("-")[0];
};

// Some locales are NOT served from the default host under a locale segment.
// China (zh-cn) lives on its own host (ti.com.cn) with NO locale segment, so
// the segment model above can't express it. For those locales, give the full
// header-content directory base here — it wins over the default host+segment.
//
// TODO: replace with the real China base once confirmed, e.g.:
//   "zh-cn": "https://www.ti.com.cn/assets/js/@ticom/header-content/1.latest",
const HEADER_CONTENT_BASE_OVERRIDE: Record<string, string> = {
  // "zh-cn": "https://www.ti.com.cn/assets/js/@ticom/header-content/1.latest",
};

// Resolves the header-content directory base for a locale: an explicit override
// (different host, no segment) if one exists, otherwise the default host with
// the mapped locale segment.
export const headerContentBase = (locale: string | undefined) => {
  const loc = locale ?? DEFAULT_LOCALE;
  return (
    HEADER_CONTENT_BASE_OVERRIDE[loc] ??
    `${TICOM}/header-content/1.latest/${headerContentSegment(loc)}`
  );
};

// Locale-scoped: the current locale is threaded in from the caller
// (RootLayout already has it) and resolved to TI's header-content base.
export const contentScripts = (locale: string) => {
  const base = headerContentBase(locale);
  return [
    `${base}/js/header-responsive.js`,
    // Loading this script causes the footer to load even if footer is not present on page
    // `${base}/js/footer.js`,
  ];
};
