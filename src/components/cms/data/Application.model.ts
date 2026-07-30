import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";

export const ApplicationType = contentType({
  key: `${KEY_PREFIX}Application_Data`,
  displayName: `${DISPLAY_NAME_PREFIX}Application`,
  baseType: "_component",
  properties: {
    applicationId: {
      type: "string",
      displayName: "Application Id",
      group: PropertyTypes.Data,
      indexingType: "queryable",
      isLocalized: false,
    },
    categoryId: {
      type: "string",
      displayName: "Category Id",
      group: PropertyTypes.Data,
      indexingType: "queryable",
      isLocalized: false,
    },
    sectorId: {
      type: "string",
      displayName: "Sector Id",
      group: PropertyTypes.Data,
      indexingType: "queryable",
      isLocalized: false,
    },
    marketId: {
      type: "string",
      displayName: "Market Id",
      group: PropertyTypes.Data,
      indexingType: "queryable",
      isLocalized: false,
    },
  },
});

export const ApplicationFolderType = contentType({
  key: `${KEY_PREFIX}Application_Folder`,
  displayName: `${DISPLAY_NAME_PREFIX}Application Folder`,
  baseType: "_folder",
  properties: {},
  mayContainTypes: ["_self", ApplicationType],
});
