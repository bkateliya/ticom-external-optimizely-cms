import { JsonLdNode } from "@/lib/schema";

type JsonLdProps = {
  /** A single JSON-LD node or an array of nodes to emit. */
  data: JsonLdNode | JsonLdNode[];
};

/**
 * Serialize JSON-LD safely for embedding in an inline <script>.
 *
 * `JSON.stringify` already drops `undefined` values. We additionally escape the
 * HTML-significant characters `<`, `>` and `&` so that attacker-controlled CMS
 * text (e.g. `"</script>"` or `"<!--"`) can never break out of the script
 * element — a classic XSS vector for inline JSON. The escaped sequences are
 * still valid JSON, so consumers parse the data unchanged.
 */
function serialize(data: JsonLdNode | JsonLdNode[]): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/**
 * Renders a `<script type="application/ld+json">` tag containing Schema.org
 * structured data. This is the low-level primitive used by both page-level
 * schema (see SchemaMarkup) and component-level schema — any server component
 * can build its own JSON-LD node and drop a <JsonLd /> next to its markup.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
