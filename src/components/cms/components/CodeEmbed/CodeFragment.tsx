import { OptiComponentProps } from "@/lib/ts/component-props";

import { CodeFragmentComponentType } from "./CodeFragment.model";

export function CodeFragmentComponent({
  content,
}: OptiComponentProps<typeof CodeFragmentComponentType>) {
  if (!content) {
    return null;
  }

  // Plain string field: stored verbatim, so nothing sanitises or strips the
  // HTML/JS. Only normalise stray non-breaking spaces from a copied page.
  const html = content.code?.replace(/\u00a0/g, " ") ?? "";

  if (!html.trim()) {
    return null;
  }

  return <div className="code-embed" dangerouslySetInnerHTML={{ __html: html }} />;
}
