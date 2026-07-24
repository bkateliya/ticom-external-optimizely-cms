import { ContentProps } from "@optimizely/cms-sdk";
import { SimpleExperiencePageType } from "./SimpleExperience.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { populatePageData } from "@/lib/data/site-settings";

type Props = {
  content: ContentProps<typeof SimpleExperiencePageType>;
};

export async function SimpleExperiencePage({ content }: Props) {
  await populatePageData(content);
  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

