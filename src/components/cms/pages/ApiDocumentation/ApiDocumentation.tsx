import { ContentProps } from "@optimizely/cms-sdk";
import { ApiDocumentationPageType } from "./ApiDocumentation.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { ReusableColumnGrid } from "../../components/ColumnGrid/ReusableColumnGrid";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { cached } from "@/lib/data/opti";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { Main } from "@/components/global/Main/Main";

type Props = {
  content: ContentProps<typeof ApiDocumentationPageType>;
};

export async function ApiDocumentationPage({ content }: Props) {
  const nav = normalizeGenericContentToTyped(
    await cached.getReferencedContent(content.hierarchyNav),
  );
  return (
    <SiteFrame content={content}>
      <SectionWrapper noPaddingTop noPaddingBottom>
        <ReusableColumnGrid
          columnOptions="25-75"
          columns={[
            {
              content: <ExtendedOptimizelyComponent content={nav} />,
            },
            {
              content: [
                <CommonPageHero key={"pageHeading"} content={content} />,
                <Main key={"main"} content={content} />,
              ],
            },
          ]}
        />
      </SectionWrapper>
    </SiteFrame>
  );
}
