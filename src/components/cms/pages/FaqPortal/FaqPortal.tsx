import { ContentProps } from "@optimizely/cms-sdk";
import { FaqPortalPageType } from "./FaqPortal.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";

type Props = {
  content: ContentProps<typeof FaqPortalPageType>;
};

export async function FaqPortalPage({ content }: Props) {

  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

