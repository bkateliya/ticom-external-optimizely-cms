import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";

export const HorizontalRuleComponentType = contentType({
  key: AllComponentTypeKeyMap.HorizontalRuleComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Horizontal Rule`,
  baseType: "_component",
  properties: {
    ruleStyle: {
      type: "string",
      format: "selectOne",
      displayName: "Rule Style",
      group: PropertyTypes.Appearance,
      enum: [
        {
          value: "primary",
          displayName: "Primary",
        },
        {
          value: "secondary",
          displayName: "Secondary",
        },
        {
          value: "reversed",
          displayName: "Reversed",
        },
      ],
    },
  },
});

export type HorizontalRuleStyle = "primary" | "secondary" | "reversed";
