import { ContentProps } from "@optimizely/cms-sdk";
import { AutoNewsReleaseStoryPageType } from "./AutoNewsReleaseStory.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";

type Props = {
  content: ContentProps<typeof AutoNewsReleaseStoryPageType>;
};

export async function AutoNewsReleaseStoryPage({ content }: Props) {

  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

