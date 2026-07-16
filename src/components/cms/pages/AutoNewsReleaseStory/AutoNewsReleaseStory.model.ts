import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import { CommonPageContracts } from "@/components/cms/contracts/common";

export const AutoNewsReleaseStoryPageType = contentType({
  key: PageTypeKeyMap.AutoNewsReleaseStoryPageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Auto News Release Story Page`,
  baseType: "_page",
  extends: CommonPageContracts,
  properties: {
  },
});
