import { setContextData } from "@optimizely/cms-sdk/react/server";

type PageContextContent = {
  _metadata?: { key?: string; types?: string[] };
};

/**
 * Sets the page-level context values that nested server components read via
 * `getContextData` — `pageTitle`, `pageContentId`, and `pageType`.
 *
 * Call this from every page/experience renderer so components like `Hero` get
 * consistent page data regardless of which page or experience type is rendering.
 * The caller resolves `pageTitle` since the fallback source differs per type
 * (e.g. experiences fall back to the hero headline).
 */
export function setPageContext(content: PageContextContent, pageTitle: string) {
  setContextData("pageTitle", pageTitle);
  setContextData("pageContentId", content._metadata?.key ?? "");
  setContextData("pageType", content._metadata?.types?.[0] ?? "");
}
