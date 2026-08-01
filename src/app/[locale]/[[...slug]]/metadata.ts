import { Metadata } from "next";
import { getPageContent } from "@/lib/data/opti";
import { withLocale } from "@/lib/utils/link-utils";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  toGraphLocale,
} from "@/constants/locales";

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};


export function toHreflang(locale: string): string {
  const [language, second] = locale.split("-");
  return second?.length === 4 ? `${language}-${second}` : language;
}


export function buildAlternates(
  base: string,
  pathname: string,
  currentLocale: string,
): Metadata["alternates"] {
  const href = (locale: string) => `${base}${withLocale(pathname, locale)}`;

  // x-default first, as on ti.com: it's the version for every language we don't
  // list, and ours is the default locale.
  const languages: Record<string, string> = {
    "x-default": href(DEFAULT_LOCALE),
  };
  for (const locale of SUPPORTED_LOCALES) {
    languages[toHreflang(toGraphLocale(locale))] = href(locale);
  }

  return { canonical: href(currentLocale), languages };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) {
    return {};
  }

  // Shares the page's own fetch via React cache — no extra Graph request.
  const { content } = await getPageContent(locale, slug);
  const url = content?._metadata?.url;
  if (!url?.default) {
    return {};
  }

  return { alternates: buildAlternates(url.base ?? "", url.default, locale) };
}
