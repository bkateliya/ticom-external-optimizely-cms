import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { LinkContract } from "../../contracts/element-contracts/link.model";

export const LinkElementType = contentType({
  key: `${KEY_PREFIX}Link_Element`,
  displayName: `${DISPLAY_NAME_PREFIX}Link`,
  baseType: "_component",
  compositionBehaviors: ["elementEnabled"],
  extends: [LinkContract],
});
