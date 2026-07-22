export const SUPPORTED_LOCALES = ["en-us", "zh-cn", "zh-tw", "de-de", "ja-jp", "ko-kr", "es-mx"];
export const DEFAULT_LOCALE = SUPPORTED_LOCALES[0];

// A language has two identities: our app's URL slug ("zh-cn" — used in URLs,
// TI's header CDN segment, and DOM lang) and Optimizely Graph's BCP-47 Language
// Code ("zh-Hans-CN" — stored in `_metadata.locale` and passed by the CMS
// preview in its `loc` param). For most languages the code is just the
// uppercased slug (ez̄n-us ~ en-US), which Graph matches case-insensitively; only
// Chinese carries a script subtag the slug drops. This map is the single source
// of truth — the inverse is derived from it so the two directions can't drift.
const SLUG_TO_LANGUAGE_CODE: Record<string, string> = {
  "zh-cn": "zh-Hans-CN",
  "zh-tw": "zh-Hant-TW",
};
const LANGUAGE_CODE_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_TO_LANGUAGE_CODE).map(([slug, code]) => [code.toLowerCase(), slug]),
);

const normalizeLocale = (value: string) => value.toLowerCase().replace(/_/g, "-");

// App URL slug -> Graph Language Code, for queries filtered by
// `_metadata.locale` (e.g. "zh-cn" -> "zh-Hans-CN"). Unmapped slugs pass
// through unchanged — Graph matches "en-us" to "en-US" case-insensitively.
export function toGraphLocale(slug: string | undefined | null): string {
  if (!slug) return DEFAULT_LOCALE;
  const normalized = normalizeLocale(slug);
  return SLUG_TO_LANGUAGE_CODE[normalized] ?? normalized;
}

// Graph Language Code (or an already-slug value) -> app URL slug
// (e.g. "zh-Hans-CN" -> "zh-cn"). Falls back to DEFAULT_LOCALE for anything
// unrecognized. Inverse of toGraphLocale.
export function toAppLocale(languageCode: string | undefined | null): string {
  if (!languageCode) return DEFAULT_LOCALE;
  const normalized = normalizeLocale(languageCode);
  return (
    LANGUAGE_CODE_TO_SLUG[normalized] ??
    (SUPPORTED_LOCALES.includes(normalized) ? normalized : DEFAULT_LOCALE)
  );
}
const regionNameFormatter = new Intl.DisplayNames(["en"], { type: "region" });
const languageNameFormatter = new Intl.DisplayNames(["en"], {
  type: "language",
});

export interface LocaleOption {
  localeCode: string;
  localeName: string | undefined;
  languageCode: string;
  languageName: string | undefined;
  regionCode: string;
  regionName: string | undefined;
}

export const LOCALE_OPTIONS: LocaleOption[] = SUPPORTED_LOCALES.map(
  (localeCode) => {
    const [languageCode, regionCode] = localeCode.split("-");
    return {
      localeCode: localeCode,
      localeName: languageNameFormatter.of(localeCode),
      languageCode: languageCode,
      languageName: languageNameFormatter.of(languageCode),
      regionCode: regionCode,
      regionName: regionNameFormatter.of(regionCode),
    };
  },
);
