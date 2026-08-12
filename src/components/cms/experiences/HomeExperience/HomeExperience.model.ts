import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import {
  CommonPageContracts,
  AllPageAndExperienceTypeKeys,
} from "@/components/cms/contracts/common";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const HomeExperienceType = contentType({
  baseType: "_experience",
  key: `${KEY_PREFIX}HomeExperience_Experience`,
  displayName: `${DISPLAY_NAME_PREFIX}Home Experience Page`,
  extends: [...CommonPageContracts],
  mayContainTypes: AllPageAndExperienceTypeKeys,
  properties: {
    hero: {
      type: "content",
      displayName: "Page Header Selection",
      isLocalized: true,
      allowedTypes: [AllowIn.HomePageHeader],
    },
  },
});
