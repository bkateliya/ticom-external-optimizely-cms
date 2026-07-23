import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";

export const ProductFamilyType = contentType({
  key: `${KEY_PREFIX}ProductFamily_Data`,
  displayName: `${DISPLAY_NAME_PREFIX}Product Family`,
  baseType: "_component",
  properties: {
    familyId: {
      type: "string",
      displayName: "Product Family Id",
      group: PropertyTypes.Data,
      indexingType: "queryable",
      isLocalized: false,
    },
    siloId: {
      type: "string",
      displayName: "Silo Id",
      group: PropertyTypes.Data,
      indexingType: "queryable",
      isLocalized: false,
    },

    // Additional fields can go here, but it's easier to add fields than remove so we'll add as needed.

    // familyName: {
    //   type: "string",
    //   displayName: "Product Family Name",
    //   group: "Content",
    // },
    // siloName: {
    //   type: "string",
    //   displayName: "Silo Name",
    //   group: "Content",
    // },
  },
});

export const ProductFamilyFolderType = contentType({
  key: `${KEY_PREFIX}ProductFamily_Folder`,
  displayName: `${DISPLAY_NAME_PREFIX}Product Family Folder`,
  baseType: "_folder",
  properties: {},
  mayContainTypes: ["_self", ProductFamilyType]
});
