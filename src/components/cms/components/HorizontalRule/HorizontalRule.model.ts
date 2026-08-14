import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const HorizontalRuleComponentType = contentType({
  key: AllComponentTypeKeyMap.HorizontalRuleComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Horizontal Rule`,
  baseType: "_component",
  extends: [...AllowIn.Groupings.Common],
  compositionBehaviors: ["sectionEnabled"],
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
      ],
    },
  },
});

export type HorizontalRuleStyle = "primary" | "secondary" | "reversed";
