import { ContentProps } from "@optimizely/cms-sdk";
import { ApiDeveloperPageType } from "./ApiDeveloper.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";

type Props = {
  content: ContentProps<typeof ApiDeveloperPageType>;
};

export async function ApiDeveloperPage({ content }: Props) {

  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

