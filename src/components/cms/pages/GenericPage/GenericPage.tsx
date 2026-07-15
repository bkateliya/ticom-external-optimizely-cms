import { ReactNode } from "react";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { Breadcrumb } from "@/components/global/Breadcrumb/Breadcrumb";
import { setPageContext, type PageContent } from "@/lib/utils/page-context-utils";

type Props = {
  content: PageContent;
  children?: ReactNode;
};

export function GenericPage({ content, children }: Props) {
  const { pa } = getPreviewUtils(content);

  setPageContext(content);

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
