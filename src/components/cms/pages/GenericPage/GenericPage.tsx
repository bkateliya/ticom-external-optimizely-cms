import { ReactNode } from "react";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { Breadcrumb } from "@/components/global/Breadcrumb/Breadcrumb";
import { setPageContext } from "@/lib/utils/page-context-utils";

/**
 * Minimal structural shape the shared page shell needs. Any page content type
 * that extends `PageContentContract` (so it has `pageTitle`) satisfies this —
 * e.g. `ArticlePageType`. Kept structural so a single `GenericPage` can be
 * reused across page types, the same way `GenericExperience` is shared across
 * experience types.
 */
export type GenericPageContent = {
  __typename: string;
  pageTitle?: string | null;
  _metadata?: { key?: string; types?: string[] };
};

type Props = {
  content: GenericPageContent;
  children?: ReactNode;
};

export function GenericPage({ content, children }: Props) {
  const { pa } = getPreviewUtils(content);

  setPageContext(content, content.pageTitle ?? "");

  return (
    <main className="generic-page">
      <Breadcrumb />
      <SectionWrapper>
        <h1 {...pa("pageTitle")}>{content.pageTitle}</h1>
      </SectionWrapper>
      {children}
    </main>
  );
}
