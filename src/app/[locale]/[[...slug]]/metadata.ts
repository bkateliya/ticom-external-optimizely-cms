import { Metadata } from "next";
import { getPageContent } from "@/lib/data/opti";
import { withLocale } from "@/lib/utils/link-utils";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  toGraphLocale,
} from "@/constants/locales";
import { CommonPageContractType } from "@/components/cms/contracts/common";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { PageHeadingContractContentType } from "@/components/cms/contracts/component-contracts/page-headings.model";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import {
  RichTextFieldContent,
  SimpleRichTextNode,
} from "@/components/ui/cms/RichTextField";

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
  };
}

function getPageHeading(
  content: OptiComponentProps<CommonPageContractType>["content"],
) {
  return normalizeGenericContentToTyped<PageHeadingContractContentType>(
    content?.hero,
  );
}

function richTextToPlainText(
  richText: RichTextFieldContent | null | undefined,
  maxLength?: number,
) {
  const fullString =
    richText?.json?.children.map(parseRichTextNode).join(" ").trim() ?? "";

  return truncateString(fullString, maxLength);
}

function truncateString(
  fullString: string | null | undefined,
  maxLength?: number,
) {
  if (!maxLength) {
    return fullString;
  }
  const split = fullString?.split(" ") ?? [];
  let finalString = "";
  for (let i = 0; i < split.length; i++) {
    const element = split[i];
    finalString += " " + element;
    if (finalString.length >= maxLength) {
      return finalString;
    }
  }
  return finalString;
}

function parseRichTextNode(node: SimpleRichTextNode): string {
  const children = node.children ?? [];
  const textArray = [
    node.text?.trim(),
    ...children.map(parseRichTextNode),
  ].filter(Boolean);
  return textArray.join(" ").trim();
}
