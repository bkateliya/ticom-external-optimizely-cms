import {
  // getPreviewUtils,
  OptimizelyComposition,
} from "@optimizely/cms-sdk/react/server";
import { ContentProps } from "@optimizely/cms-sdk";
import { GenericExperienceType } from "./FlexibleMarketing.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
// import { getTranslations } from "next-intl/server";
import { CommonPageHero } from "@/components/global/CommonPageHero";

type Props = {
  content: ContentProps<typeof GenericExperienceType>;
};

export async function GenericExperience({ content }: Props) {
  // const { pa } = getPreviewUtils(content);

  // const t = await getTranslations();

  return (

    <SiteFrame>
      {/* <pre>Translation test: {t("Learn About")}</pre> */}
      <CommonPageHero content={content} />

      <OptimizelyComposition
        nodes={content.composition.nodes ?? []}
      />
    </SiteFrame>
  );
}
