import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "@/components/cms/components/keys";

export const HorizontalRulePageDividerComponentType = contentType({
  key: AllComponentTypeKeyMap.HorizontalRulePageDividerComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Horizontal Rule - Page Divider`,
  baseType: "_component",
  compositionBehaviors: ["sectionEnabled"],
  properties: {},
});
