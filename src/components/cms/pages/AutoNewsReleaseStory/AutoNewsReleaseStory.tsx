import { ContentProps } from "@optimizely/cms-sdk";
import { AutoNewsReleaseStoryPageType } from "./AutoNewsReleaseStory.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { populatePageData } from "@/lib/data/site-settings";

type Props = {
  content: ContentProps<typeof AutoNewsReleaseStoryPageType>;
};

export async function AutoNewsReleaseStoryPage({ content }: Props) {
  await populatePageData(content);
  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

