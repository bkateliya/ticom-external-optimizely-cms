import { ContentProps } from "@optimizely/cms-sdk";
import { VideoSeriesPageType } from "./VideoSeries.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { populatePageData } from "@/lib/data/site-settings";
import { Main } from "@/components/global/Main/Main";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";

type Props = {
  content: ContentProps<typeof VideoSeriesPageType>;
};

export async function VideoSeriesPage({ content }: Props) {
  await populatePageData(content);

  return (
    <SiteFrame content={content}>
      <SectionWrapper noPaddingTop noPaddingBottom>
        <CommonPageHero key={"pageHeading"} content={content} />
        <Main key={"main"} content={content} />,
      </SectionWrapper>
    </SiteFrame>
  );
}

