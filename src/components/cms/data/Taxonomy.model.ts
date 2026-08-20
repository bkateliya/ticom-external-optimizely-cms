import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";

export const TaxonomyType = contentType({
  key: `${KEY_PREFIX}Taxonomy_Data`,
  displayName: `${DISPLAY_NAME_PREFIX}Taxonomy`,
  baseType: "_component",
  properties: {
    value: {
      type: "string",
      displayName: "Value",
      group: PropertyTypes.Data,
      indexingType: "queryable",
      isLocalized: false,
    },
  },
});
