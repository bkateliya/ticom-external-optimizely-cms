import { ContentProps } from "@optimizely/cms-sdk";
import { HomeExperienceType } from "./HomeExperience.model";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { OptimizelyComposition } from "@optimizely/cms-sdk/react/server";
import { populatePageData } from "@/lib/data/site-settings";
import { HomePageBannerCarouselComponent } from "./HomePageBannerCarousel";

type Props = {
  content: ContentProps<typeof HomeExperienceType>;
};

export async function HomeExperience({ content }: Props) {
  await populatePageData(content);

  if (!content) {
    return null;
  }

  return (
    <SiteFrame content={content}>
      <HomePageBannerCarouselComponent content={content} />

      <CommonPageHero content={content} />

      <OptimizelyComposition nodes={content.composition.nodes ?? []} />
    </SiteFrame>
  );
}
