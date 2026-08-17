import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";

export const PartnerResourceFilterOptionComponentType = contentType({
  key: AllComponentTypeKeyMap.PartnerResourceFilterOptionComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Partner Resource Filter Option`,
  baseType: "_component",
  properties: {
    OptionText: {
      type: "string",
      format: "shortString",
      displayName: "Option Text",
      isLocalized: true,
      group: PropertyTypes.Content,
    },
  },
});
