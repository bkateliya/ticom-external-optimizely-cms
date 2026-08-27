// Server-only: resolved URLs built here are threaded down to client components
// as props (see RootLayout/TiScripts) rather than imported client-side, so the
// base domain env variable itself never needs to reach the browser bundle.

import { DEFAULT_LOCALE } from "@/constants/locales";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";

// Base URL for TI's @ticom asset host. Sourced from the environment so it can
// be swapped per deployment (int vs. prod: https://www.ti.com/assets/js/@ticom).
export const TICOM =
  SERVER_ENV_VARS.TICOM_BASE_DOMAIN + "/assets/js/@ticom";

// Global header stylesheet, served from the same @ticom host (no locale segment).
export const GLOBAL_HEADER_CSS = `${TICOM}/header-content/1.latest/style/ticom.global.header.css`;

// TI's plain asset root (…/assets), one level above the @ticom package host.
const TI_ASSETS = SERVER_ENV_VARS.TICOM_BASE_DOMAIN + "/assets";

/**
 * The API/subsite header (AEM `subsiteHeader`) is a different component from the
 * main responsive header and ships its own pair of assets — verified against
 * https://www.ti.com/developer-api/overview.html:
 *
 *  - the CSS holds every `ti_header-*` rule; GLOBAL_HEADER_CSS has none of them
 *  - the JS is a bare IIFE that reads `#ti_header` the moment it runs, so it has
 *    to load *after* the markup and it throws on pages without it. Load it from
 *    ApiHeader, never from the root layout.
 *
 * `header-responsive.js` is NOT involved: it drives `#tiResponsiveHeader`, which
 * the subsite header doesn't have.
 */
export const SUBSITE_HEADER_CSS = `${TI_ASSETS}/style/ticom.header.subpage.css`;
export const SUBSITE_HEADER_JS = `${TI_ASSETS}/js/ticom.header.subpage.js`;

// Swagger UI theme override, per the API Swagger component's technical
// requirements (same host/pattern as the subsite header assets above).
export const SWAGGER_UI_CSS = `${TI_ASSETS}/style/ticom.swaggerui.css`;

export const MODULE_BUNDLES = [
  `${TICOM}/ui-components/3.latest/ui-components.esm.js`,
  `${TICOM}/header-components/3.latest/header-components.esm.js`,
  `${TICOM}/feature-components/2.4.18/feature-components.esm.js`,
  `${TICOM}/selection-tool-components/1.latest/selection-tool-components.esm.js`,
  `${TICOM}/personalization-components/0.0.41/personalization-components.esm.js`,
  // Defines <ti-import-details-main-wrapper> for Code Embed. A pasted embed
  `${TICOM}/import-details-components/1.latest/import-details-components.esm.js`,
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
  "ko-kr": "kr",
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
