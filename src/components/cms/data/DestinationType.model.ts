import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";

export const DestinationTypeType = contentType({
  key: `${KEY_PREFIX}DestinationType_Data`,
  displayName: `${DISPLAY_NAME_PREFIX}Destination Type`,
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

export const DestinationTypeFolderType = contentType({
  key: `${KEY_PREFIX}DestinationType_Folder`,
  displayName: `${DISPLAY_NAME_PREFIX}Destination Type Folder`,
  baseType: "_folder",
  properties: {},
  mayContainTypes: ["_self", DestinationTypeType],
});
