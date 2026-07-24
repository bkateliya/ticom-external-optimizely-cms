import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import {
  AllPageAndExperienceTypeKeys,
  CommonPageContracts,
} from "@/components/cms/contracts/common";
import { ExperienceTypeKeyMap } from "../keys";

export const SimpleExperiencePageType = contentType({
  key: ExperienceTypeKeyMap.SimpleExperiencePageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Simple Experience Page - Legacy Navigational Page`,
  baseType: "_page",
  extends: CommonPageContracts,
  properties: {},
  mayContainTypes: AllPageAndExperienceTypeKeys,
});
