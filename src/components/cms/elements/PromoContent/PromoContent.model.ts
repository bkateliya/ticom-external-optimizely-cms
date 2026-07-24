import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { LinkContract } from "../../contracts/element-contracts/link.model";
import { HeadlineContract } from "../../contracts/component-contracts/headline.model";

export const PromoContentElementType = contentType({
  key: `${KEY_PREFIX}PromoContent_Element`,
  displayName: `${DISPLAY_NAME_PREFIX}Promo Content`,
  baseType: "_component",
  extends: [HeadlineContract, LinkContract],
  compositionBehaviors: ["elementEnabled"],
  properties: {},
});
