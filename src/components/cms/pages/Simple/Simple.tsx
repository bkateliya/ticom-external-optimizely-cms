import { ContentProps } from "@optimizely/cms-sdk";
import { SimplePageType } from "./Simple.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";

type Props = {
  content: ContentProps<typeof SimplePageType>;
};

export async function SimplePage({ content }: Props) {

  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

