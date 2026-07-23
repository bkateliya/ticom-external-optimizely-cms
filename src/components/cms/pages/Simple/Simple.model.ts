import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import { CommonPageContracts } from "@/components/cms/contracts/common";

export const SimplePageType = contentType({
  key: PageTypeKeyMap.SimplePageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Simple Page`,
  baseType: "_page",
  extends: CommonPageContracts,
  properties: {
  },
});
