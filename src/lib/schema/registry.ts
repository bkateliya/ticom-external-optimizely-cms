/**
 * Per-page schema selection.
 *
 * This is the single place that decides **which schema set a page emits, based
 * on the page**. Map a content-type key to the ordered list of builders that
 * page should produce; a page type absent from the map emits no structured data.
 * That is how "some pages have schema, some don't" is configured — declaratively,
 * in code, with no CMS fields.
 *
 * To give a new page type structured data, add an entry here. To change what an
 * existing page emits, edit its list.
 */

import { HomeExperienceType } from "@/components/cms/experiences/HomeExperience/HomeExperience.model";
import { ArticlePageType } from "@/components/cms/pages/Article/Article.model";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildWebSiteSchema,
  JsonLdNode,
  SchemaBuilder,
  SchemaContent,
} from ".";

export const schemaRegistry: Record<string, SchemaBuilder[]> = {
  // Home / site root: WebSite (not Article — it isn't an article; no breadcrumb —
  // the home page has no trail).
  [HomeExperienceType.key]: [buildWebSiteSchema],

  // Article pages: Article + breadcrumb trail.
  [ArticlePageType.key]: [buildArticleSchema, buildBreadcrumbSchema],

  // Example — a page type that should only emit breadcrumbs:
  // [SomeOtherPageType.key]: [buildBreadcrumbSchema],
};

/**
 * Resolve the builder set for a page from its `_metadata.types`. A content
 * object reports several types (its own key, contracts, base types); we union
 * the builders of every registered type it matches, de-duplicated and in order.
 */
export function resolveSchemaBuilders(content: SchemaContent): SchemaBuilder[] {
  const builders: SchemaBuilder[] = [];
  const seen = new Set<SchemaBuilder>();
  for (const type of content._metadata?.types ?? []) {
    for (const build of schemaRegistry[type] ?? []) {
      if (!seen.has(build)) {
        seen.add(build);
        builders.push(build);
      }
    }
  }
  return builders;
}

/**
 * Assemble structured data for a page. Uses the registry by default; pass an
 * explicit `override` to force a specific set at one placement. Builders
 * returning `null` are dropped.
 */
export function buildPageSchemas(
  content: SchemaContent,
  override?: SchemaBuilder[],
): JsonLdNode[] {
  return (override ?? resolveSchemaBuilders(content))
    .map((build) => build(content))
    .filter((schema): schema is JsonLdNode => schema !== null);
}
