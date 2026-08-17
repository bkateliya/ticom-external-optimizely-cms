import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "@/components/cms/components/keys";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";

export const HorizontalRuleContentDividerComponentType = contentType({
  key: AllComponentTypeKeyMap.HorizontalRuleContentDividerComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Horizontal Rule - Content Divider`,
  baseType: "_component",
  extends: [...AllowIn.Groupings.Common],
  properties: {
    spacing: {
      type: "string",
      format: "selectOne",
      displayName: "Spacing",
      group: PropertyTypes.Appearance,
      isRequired: true,
      enum: [
        {
          value: "none",
          displayName: "None",
        },
        {
          value: "compact",
          displayName: "Compact - Default",
        },
        {
          value: "comfortable",
          displayName: "Comfortable",
        },
      ],
    },
  },
});
