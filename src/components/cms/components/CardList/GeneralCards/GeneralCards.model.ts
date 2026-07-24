import { CtaListContract } from "@/components/cms/contracts/component-contracts/cta-list.model";
import { HeadlineContract } from "@/components/cms/contracts/component-contracts/headline.model";
import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
} from "src/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../../keys";

export const SingleGeneralCardComponentType = contentType({
  key: AllComponentTypeKeyMap.SingleGeneralCardComponent,
  displayName: `${DISPLAY_NAME_PREFIX}General Card`,
  baseType: "_component",
  extends: [HeadlineContract, CtaListContract],
  properties: {},
});

export const GeneralCardsComponentType = contentType({
  key: AllComponentTypeKeyMap.GeneralCardsComponent,
  displayName: `${DISPLAY_NAME_PREFIX}General Cards`,
  baseType: "_component",
  properties: {
    cards: {
      type: "array",
      displayName: "Cards",
      group: "content",
      items: {
        type: "content",
        allowedTypes: [SingleGeneralCardComponentType.key],
      },
    },
  },
  // compositionBehaviors: ["sectionEnabled"],
});
