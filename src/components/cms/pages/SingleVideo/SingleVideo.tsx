import { ContentProps } from "@optimizely/cms-sdk";
import { SingleVideoPageType } from "./SingleVideo.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { Main } from "@/components/global/Main/Main";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";

type Props = {
  content: ContentProps<typeof SingleVideoPageType>;
};

export async function SingleVideoPage({ content }: Props) {
  return (
    <SiteFrame content={content}>
      <SectionWrapper noPaddingTop noPaddingBottom>
        <CommonPageHero key={"pageHeading"} content={content} />
        <Main key={"main"} content={content} />,
      </SectionWrapper>
    </SiteFrame>
  );
}
