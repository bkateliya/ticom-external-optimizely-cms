import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { HeadlineContract } from "../../contracts/component-contracts/headline.model";
import { DeprecatedCtaListContract } from "../../contracts/component-contracts/cta-list.model";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const HeroComponentType = contentType({
  key: AllComponentTypeKeyMap.HeroComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Hero`,
  baseType: "_component",
  extends: [HeadlineContract, DeprecatedCtaListContract, AllowIn.PageHeader],
  properties: {
    image: { type: "contentReference", allowedTypes: ["_image"] },
  },
});
