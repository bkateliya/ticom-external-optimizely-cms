import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import { CommonPageContracts } from "@/components/cms/contracts/common";

export const FaqQuestionAnswerPageType = contentType({
  key: PageTypeKeyMap.FaqQuestionAnswerPageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}FAQ Question Answer Page`,
  baseType: "_page",
  extends: CommonPageContracts,
  properties: {
  },
});
