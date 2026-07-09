export const SUPPORTED_LOCALES = ["en-us", "zh-cn", "zh-tw", "de-de", "ja-jp", "ko-kr", "es-mx"];

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
