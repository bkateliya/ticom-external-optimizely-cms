import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { ExperienceTypeKeyMap } from "../keys";
import {
  AllPageAndExperienceTypeKeys,
  CommonPageContracts,
} from "@/components/cms/contracts/common";

export const GenericExperienceType = contentType({
  baseType: "_experience",
  key: ExperienceTypeKeyMap.FlexibleMarketingExperienceTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}FlexibleMarketing Experience`,
  extends: CommonPageContracts,
  mayContainTypes: AllPageAndExperienceTypeKeys,

  properties: {},
});
