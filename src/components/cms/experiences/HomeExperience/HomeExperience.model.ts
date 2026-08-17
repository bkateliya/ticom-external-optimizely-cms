import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
  propertyGroupKeys,
} from "@/components/cms/constants.mjs";
import {
  CommonPageContracts,
  AllPageAndExperienceTypeKeys,
} from "@/components/cms/contracts/common";

export const HomeExperienceType = contentType({
  baseType: "_experience",
  key: `${KEY_PREFIX}HomeExperience_Experience`,
  displayName: `${DISPLAY_NAME_PREFIX}Home Experience Page`,
  extends: [...CommonPageContracts],
  mayContainTypes: AllPageAndExperienceTypeKeys,
  properties: {
    homePageBannerMinSlides: {
      type: "integer",
      displayName: "Minimum number of banners (default 4)",
      group: propertyGroupKeys.ComponentConfiguration,
    },
    homePageBannerMaxSlides: {
      type: "integer",
      displayName: "Maximum number of banners (default 5)",
      group: propertyGroupKeys.ComponentConfiguration,
    },
  },
});
