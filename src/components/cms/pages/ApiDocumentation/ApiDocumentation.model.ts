import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import {
  AllPageAndExperienceTypeKeys,
  CommonPageContracts,
} from "@/components/cms/contracts/common";

export const ApiDocumentationPageType = contentType({
  key: PageTypeKeyMap.ApiDocumentationPageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}API Documentation Page`,
  baseType: "_page",
  extends: CommonPageContracts,
  properties: {},
  mayContainTypes: AllPageAndExperienceTypeKeys,
});
