import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";

/**
 * No authoring fields: navigation items are collected automatically from
 * page elements carrying jumpLinkHash / jumpLinkText (see JumpLinkTarget).
 * Only this component's position on the page is authored.
 */
export const JumpLinkNavigationComponentType = contentType({
  key: AllComponentTypeKeyMap.JumpLinkNavigationComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Jump Link Navigation`,
  baseType: "_component",
  properties: {},
});
