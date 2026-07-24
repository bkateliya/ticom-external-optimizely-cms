import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { ExperienceTypeKeyMap } from "../keys";
import {
  AllPageAndExperienceTypeKeys,
  CommonPageContracts,
} from "@/components/cms/contracts/common";

export const VisualExperiencePageType = contentType({
  baseType: "_experience",
  key: ExperienceTypeKeyMap.VisualExperiencePageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Visual Experience Page`,
  extends: CommonPageContracts,
  mayContainTypes: AllPageAndExperienceTypeKeys,

  properties: {},
});
