import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../../constants.mjs";
import { AllComponentTypeKeyMap } from "../../keys";
import { DeprecatedCtaListContract } from "../../../contracts/component-contracts/cta-list.model";
import { AllowIn } from "../../../contracts/component-contracts/allow-in.model";
import { PageHeadingContract } from "../../../contracts/component-contracts/page-headings.model";
import { ImageBaseContract } from "@/components/cms/contracts/component-contracts/image.model";

export const HeroComponentType = contentType({
  key: AllComponentTypeKeyMap.HeroComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Hero`,
  baseType: "_component",
  extends: [
    PageHeadingContract,
    ImageBaseContract,
    DeprecatedCtaListContract,
    AllowIn.PageHeader,
  ],
  properties: {},
});
