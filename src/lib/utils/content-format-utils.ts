import {
  RichTextFieldContent,
  SimpleRichTextNode,
} from "@/components/ui/cms/RichTextField";

// datePublished / dateModified / article:published_time etc. are ISO 8601
// dates (YYYY-MM-DD); the CMS stores a full datetime, so keep only the date part.
export function toIsoDate(value?: string | null): string | undefined {
  return value ? value.slice(0, 10) : undefined;
}

// "28 MAY 2026" eyebrow date format (TXI-1711): day, localized month
// abbreviation, year — always in that order, matching the doc's example.
// Built from the date part of the ISO string directly (like toIsoDate), with
// UTC used for the month lookup, so it can't shift a day depending on server
// timezone. The month name comes from Intl (locale-aware, so it's not
// hardcoded English) — pass one of SUPPORTED_LOCALES.
export function formatEyebrowDate(
  value: string | null | undefined,
  locale: string,
): string | undefined {
  if (!value) {
    return undefined;
  }
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const monthName = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
  }).format(date);
  return `${day} ${monthName} ${year}`;
}

export function richTextToPlainText(
  richText: RichTextFieldContent | null | undefined,
  maxLength?: number,
) {
  const fullString =
    richText?.json?.children.map(parseRichTextNode).join(" ").trim() ?? "";

  return truncateString(fullString, maxLength);
}

export function truncateString(
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
