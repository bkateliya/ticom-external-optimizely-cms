import { ContentProps } from "@optimizely/cms-sdk";
import { ApiExperiencePageType } from "./ApiExperience.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { OptimizelyComposition } from "@optimizely/cms-sdk/react/server";

type Props = {
  content: ContentProps<typeof ApiExperiencePageType>;
};

export async function ApiExperiencePage({ content }: Props) {
  return (
    <SiteFrame content={content}>
      <CommonPageHero content={content} />

      <OptimizelyComposition nodes={content.composition.nodes ?? []} />
    </SiteFrame>
  );
}
