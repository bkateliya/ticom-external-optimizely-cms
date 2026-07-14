import { JsonLd } from "@/components/ui/Atoms/JsonLd/JsonLd";
import { SchemaBuilder, SchemaContent } from "@/lib/schema";
import { buildPageSchemas } from "@/lib/schema/registry";

type SchemaMarkupProps = {
  content: SchemaContent;
  /**
   * Optional explicit schema set for this placement. When omitted, the schemas
   * are selected from the per-page-type registry (see @/lib/schema/registry).
   */
  builders?: SchemaBuilder[];
};

/**
 * Page-level structured data.
 *
 * Drop this into any page component. It looks up which schemas that page type
 * should emit (via the registry) and renders a JSON-LD <script> for each one
 * that applies. Pages whose type isn't registered render nothing — this is how
 * "some pages have schema, some don't" works, selected per page in code.
 *
 * For component-scoped schema (e.g. an FAQ block emitting FAQPage), use the
 * <JsonLd /> primitive directly inside that component instead.
 */
export function SchemaMarkup({ content, builders }: SchemaMarkupProps) {
  const schemas = buildPageSchemas(content, builders);
  if (schemas.length === 0) return null;
  return <JsonLd data={schemas} />;
}
