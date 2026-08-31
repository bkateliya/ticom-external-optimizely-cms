import { ContentProps } from "@optimizely/cms-sdk";
import { ArticlePageType } from "./Article.model";
import { TaxonomyType } from "../../data/Taxonomy.model";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { PageHeadingContractContentType } from "@/components/cms/contracts/component-contracts/page-headings.model";
import {
  richTextToPlainText,
  toIsoDate,
} from "@/lib/utils/content-format-utils";

// Keyed by the CMS `schemaType` enum value (see Article.model.ts), mapping to
// the schema.org @type it produces: Blog -> BlogPosting, News -> NewsArticle.
// Anything else (or unset) falls back to the generic Article type. Blog-vs-news
// is an authored choice (schemaType) because a Category leaf alone can't tell
// them apart — some leaves ("Manufacturing", "Uncategorized") live under both
// groups.
const SCHEMA_TYPE_BY_VALUE: Record<string, string> = {
  Blog: "BlogPosting",
  News: "NewsArticle",
};

const TI_ORGANIZATION = {
  "@type": "Organization",
  name: "Texas Instruments",
  url: "https://www.ti.com",
};

export function ArticleSchema({
  content,
}: {
  content: ContentProps<typeof ArticlePageType>;
}) {
  const schemaType =
    SCHEMA_TYPE_BY_VALUE[content.schemaType ?? ""] ?? "Article";
  const hero = normalizeGenericContentToTyped<PageHeadingContractContentType>(
    content.hero,
  );
  const category = normalizeGenericContentToTyped(
    content.category,
    TaxonomyType,
  );
  const url = content._metadata.url;

  // image is intentionally left out for now: the hero image is Bynder-resolved
  // (VM-only) via the shared asset map — wire it in once that path is proven.
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: hero?.pageHeadline || undefined,
    description: richTextToPlainText(hero?.pageSubheadline) || undefined,
    url: url.default ? `${url.base ?? ""}${url.default}` : undefined,
    datePublished: toIsoDate(content.datePublished),
    dateModified: toIsoDate(content.dateUpdated),
    articleSection: category?.value?.trim() || undefined,
    // News releases are authored by TI itself; blogs credit the named author.
    author:
      schemaType === "NewsArticle"
        ? TI_ORGANIZATION
        : content.author
          ? { "@type": "Person", name: content.author }
          : undefined,
    publisher: {
      ...TI_ORGANIZATION,
      logo: {
        "@type": "ImageObject",
        url: "https://www.ti.com/assets/images/ti-logo.png",
      },
    },
  }).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
