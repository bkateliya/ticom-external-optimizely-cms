import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { AllComponentTypeKeyMap } from "../keys";
import { PartnerResourceFilterOptionComponentType } from "./PartnerResourceFilterOption.model";
import { PropertyTypes } from "@/lib/property-types";

export const PartnerResourceFilterComponentType = contentType({
  key: AllComponentTypeKeyMap.PartnerResourceFilterComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Partner Resource Filter`,
  baseType: "_component",
  compositionBehaviors: ["sectionEnabled"],
  properties: {
    headline: {
      type: "string",
      displayName: "Headline",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    resourceCategory: {
      type: "array",
      displayName: "Resource Category",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [PartnerResourceFilterOptionComponentType],
      },
    },
    region: {
      type: "array",
      displayName: "Region",
      group: PropertyTypes.Content,
      sortOrder: 10,
      items: {
        type: "content",
        allowedTypes: [PartnerResourceFilterOptionComponentType],
      },
    },
  },
});
