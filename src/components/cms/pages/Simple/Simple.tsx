import { ContentProps } from "@optimizely/cms-sdk";
import { SimplePageType } from "./Simple.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { populatePageData } from "@/lib/data/site-settings";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { Main } from "@/components/global/Main/Main";

type Props = {
  content: ContentProps<typeof SimplePageType>;
};

export async function SimplePage({ content }: Props) {
  await populatePageData(content);

  return (
    <SiteFrame content={content}>
      <SectionWrapper noPaddingTop noPaddingBottom>
        <CommonPageHero key={"pageHeading"} content={content} />
        <Main content={content} />
      </SectionWrapper>
    </SiteFrame>
  );
}
