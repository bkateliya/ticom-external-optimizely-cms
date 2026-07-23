import {
  // getPreviewUtils,
  OptimizelyComposition,
} from "@optimizely/cms-sdk/react/server";
import { GenericExperienceType } from "./FlexibleMarketing.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
// import { getTranslations } from "next-intl/server";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { populatePageData } from "@/lib/data/site-settings";

type Props = OptiComponentProps<typeof GenericExperienceType>;

export async function GenericExperience({ content }: Props) {
  // const { pa } = getPreviewUtils(content);

  // const t = await getTranslations();

  await populatePageData(content);

  if (!content) {
    return null;
  }

  return (
    <SiteFrame>
      {/* <pre>Translation test: {t("Learn About")}</pre> */}
      <CommonPageHero content={content} />

      <OptimizelyComposition nodes={content.composition.nodes ?? []} />
    </SiteFrame>
  );
}
