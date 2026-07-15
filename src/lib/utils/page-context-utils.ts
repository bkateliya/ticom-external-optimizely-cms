import { setContextData } from "@optimizely/cms-sdk/react/server";
import type { ContentProps } from "@optimizely/cms-sdk";
import type { ContractContentType } from "@/lib/ts/opti";
import { PageContentContract } from "@/components/cms/contracts/page-contacts/page-content.model";
import { SEOContract } from "@/components/cms/contracts/page-contacts/seo.model";

/**
 * The base contract fields every page/experience content type shares. Any type
 * that extends `PageContentContract` + `SEOContract` (which all page and
 * experience types do) is structurally assignable to this, so we get
 * `pageTitle`, the SEO fields, and `_metadata` for free — no need to pass them
 * in separately. Add a contract to the tuple to expose more shared fields.
 */
type PageContentType = ContractContentType<[typeof PageContentContract, typeof SEOContract]>;
export type PageContent = ContentProps<PageContentType>;

/**
 * Sets the page-level context values that nested server components read via
 * `getContextData` — `pageTitle`, `pageContentId`, and `pageType`.
 *
 * Call this from every page/experience renderer so components like `Hero` get
 * consistent page data regardless of which page or experience type is rendering.
 * Everything is read straight off the content — the `PageContent` contract type
 * guarantees `pageTitle` and `_metadata` are present.
 */
export function setPageContext(content: PageContent) {
  setContextData("pageTitle", content.pageTitle ?? "");
  setContextData("pageContentId", content._metadata?.key ?? "");
  setContextData("pageType", content._metadata?.types?.[0] ?? "");
}
