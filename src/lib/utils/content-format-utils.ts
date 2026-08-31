import {
  RichTextFieldContent,
  SimpleRichTextNode,
} from "@/components/ui/cms/RichTextField";

// datePublished / dateModified / article:published_time etc. are ISO 8601
// dates (YYYY-MM-DD); the CMS stores a full datetime, so keep only the date part.
export function toIsoDate(value?: string | null): string | undefined {
  return value ? value.slice(0, 10) : undefined;
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
