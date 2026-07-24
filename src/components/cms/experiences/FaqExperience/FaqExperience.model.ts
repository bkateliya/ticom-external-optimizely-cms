import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import {
  AllPageAndExperienceTypeKeys,
  CommonPageContracts,
} from "@/components/cms/contracts/common";
import { ExperienceTypeKeyMap } from "../keys";

export const FaqExperiencePageType = contentType({
  key: ExperienceTypeKeyMap.FaqExperiencePageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}FAQ Experience Page`,
  baseType: "_page",
  extends: CommonPageContracts,
  properties: {},
  mayContainTypes: AllPageAndExperienceTypeKeys,
});
