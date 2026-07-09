import { PreambleContracts } from "../../contracts/component-contracts/preamble.model";
import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";

export const HeroComponentType = contentType({
  key: `${KEY_PREFIX}Hero_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Hero`,
  baseType: "_component",
  extends: PreambleContracts,
  properties: {
    image: { type: "contentReference", allowedTypes: ["_image"] },
  },
  compositionBehaviors: ['sectionEnabled'],
});
