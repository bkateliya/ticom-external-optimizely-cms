import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { LinkElementType } from "../../elements/Link/Link.model";
import { AllComponentTypeKeyMap } from "../keys";

export const HierarchyNavigationItemComponentType = contentType({
  key: AllComponentTypeKeyMap.HierarchyNavigationItemComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Hierarchy Navigation Item`,
  baseType: "_component",
  properties: {
    title: {
      type: "string",
      displayName: "Title",
      isLocalized: true,
      group: PropertyTypes.Content,
    },
    hierarchyNavigationChildItems: {
      displayName: "Hierarchy Navigation Child Items",
      group: PropertyTypes.Content,
      type: "array",
      sortOrder: 10,
      items: {
        type: "content",
        allowedTypes: [LinkElementType],
      },
    },
  },
});

export const HierarchyNavigationComponentType = contentType({
  key: AllComponentTypeKeyMap.HierarchyNavigationComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Hierarchy Navigation`,
  baseType: "_component",
  properties: {
    navigationItems: {
      displayName: "Navigation Items",
      group: PropertyTypes.Content,
      type: "array",
      items: {
        type: "content",
        allowedTypes: [HierarchyNavigationItemComponentType, LinkElementType],
      },
    },
  },
});
