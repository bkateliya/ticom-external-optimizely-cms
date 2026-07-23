import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { ExperienceTypeKeyMap } from "../keys";
import { CommonPageContracts } from "@/components/cms/contracts/common";

export const ApiDeveloperPageType = contentType({
  baseType: "_experience",
  key: ExperienceTypeKeyMap.ApiDeveloperExperienceTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}API Developer Experience`,
  extends: CommonPageContracts,
  properties: {
  },
});
