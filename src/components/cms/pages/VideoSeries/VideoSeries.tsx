import { ContentProps } from "@optimizely/cms-sdk";
import { VideoSeriesPageType } from "./VideoSeries.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";

type Props = {
  content: ContentProps<typeof VideoSeriesPageType>;
};

export async function VideoSeriesPage({ content }: Props) {

  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

