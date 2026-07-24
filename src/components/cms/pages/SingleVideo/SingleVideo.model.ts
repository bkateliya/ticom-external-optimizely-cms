import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import {
  AllPageAndExperienceTypeKeys,
  CommonPageContracts,
} from "@/components/cms/contracts/common";

export const SingleVideoPageType = contentType({
  key: PageTypeKeyMap.SingleVideoPageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Single Video Page`,
  baseType: "_page",
  extends: CommonPageContracts,
  properties: {},
  mayContainTypes: AllPageAndExperienceTypeKeys,
});
