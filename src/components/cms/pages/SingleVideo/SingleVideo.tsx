import { ContentProps } from "@optimizely/cms-sdk";
import { SingleVideoPageType } from "./SingleVideo.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { populatePageData } from "@/lib/data/site-settings";

type Props = {
  content: ContentProps<typeof SingleVideoPageType>;
};

export async function SingleVideoPage({ content }: Props) {
  await populatePageData(content);
  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}
