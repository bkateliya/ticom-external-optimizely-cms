import { Metadata } from "next";
import { getPageContent, getPageHeading } from "@/lib/data/opti";
import { withLocale } from "@/lib/utils/link-utils";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  toGraphLocale,
} from "@/constants/locales";
import { CommonPageContractType } from "@/components/cms/contracts/common";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { ArticlePageType } from "@/components/cms/pages/Article/Article.model";
import { TaxonomyType } from "@/components/cms/data/Taxonomy.model";
import {
  richTextToPlainText,
  toIsoDate,
  truncateString,
} from "@/lib/utils/content-format-utils";

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

  const pageHeading = getPageHeading(content);

  return {
    title: truncateString(pageHeading?.pageHeadline, 60),
    description: richTextToPlainText(pageHeading?.pageSubheadline, 160),
    alternates: url?.default
      ? buildAlternates(url.base ?? "", url.default, locale)
      : undefined,
    openGraph: getArticleOpenGraph(content),
  };
}

// Article pages carry content-specific OpenGraph tags (og:type=article plus the
// article:* set), sourced from page properties. Other page types get none.
function getArticleOpenGraph(
  content: OptiComponentProps<CommonPageContractType>["content"],
): Metadata["openGraph"] {
  const article = normalizeGenericContentToTyped(content, ArticlePageType);
  if (!article) {
    return undefined;
  }

  // `category`'s allowed type (Taxonomy) is expanded inline by the SDK, so its
  // `value` is read by casting the field — the same way `hero` is read above —
  // not via getReferencedContent (a type:"content" field carries no key).
  const category = normalizeGenericContentToTyped(
    article.category,
    TaxonomyType,
  );

  return {
    type: "article",
    // Next drops any of these from the output when undefined.
    publishedTime: toIsoDate(article.datePublished),
    modifiedTime: toIsoDate(article.dateUpdated),
    expirationTime: toIsoDate(article.dateExpire),
    authors: article.author || undefined,
    section: category?.value?.trim() || undefined,
  };
}
