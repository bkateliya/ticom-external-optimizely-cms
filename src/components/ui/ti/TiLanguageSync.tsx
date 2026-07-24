"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, getPathname } from "@/i18n/navigation";
import { SUPPORTED_LOCALES } from "@/constants/locales";

/**
 * Bridges the TI header's language selector to the app's routing.
 *
 * The header handles a language change internally by looking for
 * `<link rel="alternate" hreflang>` tags and redirecting there. This embed
 * renders none, so that path is a no-op — instead the header emits a
 * `tiLanguageChange` event (locale in TI form, e.g. "zh-CN"), which we map to
 * the app's locale slug ("zh-cn") and navigate to, keeping the user on the same
 * page in the chosen language.
 *
 * This uses a full-document navigation, NOT the SPA router: the TI header and
 * footer are built once by the locale-specific `header-responsive.js` on
 * `DOMContentLoaded`, so a soft navigation leaves the injected header/footer
 * DOM stuck in the previous language until a manual refresh. A hard navigation
 * reloads the new locale's scripts and rebuilds them — and matches the header's
 * own native language-change behavior (`window.location.href = ...`).
 */
export function TiLanguageSync() {
  const pathname = usePathname();
  const currentLocale = useLocale();

  useEffect(() => {
    function onLanguageChange(event: Event) {
      const detail = (event as CustomEvent<{ locale?: string }>).detail;
      const tiLocale = detail?.locale;
      if (!tiLocale) return;

      const slug = tiLocale.toLowerCase();
      if (!SUPPORTED_LOCALES.includes(slug) || slug === currentLocale) return;

      // Re-prefix the current (locale-stripped) path with the chosen locale,
      // preserving any query string / hash, then do a full document load.
      const href = getPathname({ href: pathname, locale: slug });
      window.location.assign(`${href}${window.location.search}${window.location.hash}`);
    }

    window.addEventListener("tiLanguageChange", onLanguageChange);
    return () => window.removeEventListener("tiLanguageChange", onLanguageChange);
  }, [pathname, currentLocale]);

  return null;
}
