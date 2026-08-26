import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const JumpLinkNavigationComponentType = contentType({
  key: AllComponentTypeKeyMap.JumpLinkNavigationComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Jump Link Navigation - Vertical`,
  baseType: "_component",
  extends: [AllowIn.Column],
  properties: {},
});

export const JumpLinkNavigationHorizontalComponentType = contentType({
  key: AllComponentTypeKeyMap.JumpLinkNavigationHorizontalComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Jump Link Navigation - Horizontal`,
  baseType: "_component",
  compositionBehaviors: ["sectionEnabled"],
  properties: {},
});
