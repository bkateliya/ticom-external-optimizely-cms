import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { HeadlineContract } from "../../contracts/component-contracts/headline.model";
import { CtaListContract } from "../../contracts/component-contracts/cta-list.model";

export const HeroComponentType = contentType({
  key: AllComponentTypeKeyMap.HeroComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Hero`,
  baseType: "_component",
  extends: [HeadlineContract, CtaListContract],
  properties: {
    image: { type: "contentReference", allowedTypes: ["_image"] },
  },
  compositionBehaviors: ['sectionEnabled'],
});
