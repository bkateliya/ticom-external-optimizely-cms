import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { ExperienceTypeKeyMap } from "../keys";
import { CommonPageContracts } from "@/components/cms/contracts/common";

export const ApiExperiencePageType = contentType({
  baseType: "_experience",
  key: ExperienceTypeKeyMap.ApiExperiencePageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}API Experience Page`,
  extends: CommonPageContracts,
  properties: {
  },
});
