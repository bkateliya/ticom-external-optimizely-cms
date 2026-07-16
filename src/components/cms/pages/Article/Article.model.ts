import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import { CommonPageContracts } from "@/components/cms/contracts/common";

export const ArticlePageType = contentType({
  key: PageTypeKeyMap.ArticlePageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Article Page`,
  baseType: "_page",
  extends: CommonPageContracts,
  properties: {
  },
});
